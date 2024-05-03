package com.goleada.goleada.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.goleada.goleada.exceptions.DuplicateCpfException;
import com.goleada.goleada.exceptions.DuplicateEmailException;
import com.goleada.goleada.exceptions.EmailNotSendException;
import com.goleada.goleada.exceptions.IncorrectPasswordException;
import com.goleada.goleada.exceptions.ItemNotFoundException;
import com.goleada.goleada.mapper.DozerMapper;
import com.goleada.goleada.models.Email;
import com.goleada.goleada.models.dtos.EmailUpdateDto;
import com.goleada.goleada.models.dtos.PasswordResetDto;
import com.goleada.goleada.models.dtos.PasswordUpdateDto;
import com.goleada.goleada.models.dtos.UserListItemDto;
import com.goleada.goleada.models.entitys.ConfirmationCode;
import com.goleada.goleada.models.entitys.User;
import com.goleada.goleada.models.enums.ConfirmationType;
import com.goleada.goleada.repositories.UserRepository;
import com.goleada.goleada.util.EmailUtils;

@Service
public class UserService extends GenericService<User> implements UserDetailsService {

   private UserRepository repository;

   public UserService(UserRepository repository) {
      super(repository);
      this.repository = repository;
   }

   @Autowired
   private ConfirmationCodeService confirmationCodeService;

   @Autowired
   private EmailService emailService;

   /**
    * Busca paginada de usuarios, permite buscar por cpf ou nome de usuario
    */
   @Transactional(readOnly = true)
   public Page<UserListItemDto> searchUser(String serach, Pageable pageable) {
      var page = this.repository.searchUser(serach, pageable);
      var userListItemPage = page.map(e -> DozerMapper.parseObject(e, UserListItemDto.class));
      return userListItemPage;
   }

   /**
    * Verifica se já existe um usuário no banco de dados com o CPF informado
    * 
    * @param cpf CPF que deseja-se verificar a existencia no banco
    * @return Retorna um {@Code boolean} com {@Code true} caso já exista um usuário
    *         com o CPF ou
    *         {@Code false} caso não exista
    */
   @Transactional(readOnly = true)
   public boolean isCpfUnic(String cpf) {
      return repository.findByCpf(cpf).isPresent();
   }

   /**
    * Verifica se já existe um usuário no banco de dados com o E-mail informado
    * 
    * @param email E-mail que deseja-se verificar a existencia no banco
    * @return Retorna um {@Code boolean} com {@Code true} caso já exista um usuário
    *         com o e-mail ou
    *         {@Code false} caso não exista
    */
   @Transactional(readOnly = true)
   public boolean isEmailUnic(String email) {
      return repository.findByEmail(email).isPresent();
   }

   /*
    * Salva o user verificando se o cpf e o email já estão cadastrados
    */
   @Transactional(readOnly = false)
   public User save(User user) {
      if (isCpfUnic(user.getCpf())) {
         throw new DuplicateCpfException("Este CPF já se encontra cadastrado.");
      }
      if (isEmailUnic(user.getEmail())) {
         throw new DuplicateEmailException("O e-mail já está associado a uma conta.");
      }
      return repository.save(user);
   }

   @Transactional(readOnly = true)
   public User getByEmail(String email) {
      Optional<User> userOpt = repository.findByEmail(email);
      if (userOpt.isPresent())
         return userOpt.get();
      throw new ItemNotFoundException("Usuário com email = " + email + " não encontrado.");
   }

   @Transactional(readOnly = true)
   public User getByCpf(String cpf) {
      Optional<User> user = repository.findByCpf(cpf);
      if (user.isPresent())
         return user.get();
      throw new ItemNotFoundException("Usuário com CPF = " + cpf + " não encontrado");
   }

   @Transactional(readOnly = true)
   public User getByUsername(String username) {
      Optional<User> user = repository.findByUsername(username);
      if (user.isPresent())
         return user.get();
      throw new ItemNotFoundException("Usuário com Nome de Usuário = " + username + " não encontrado");
   }

   /*
    * Envia um codigo de confirmação para o e-mail informado, função usada na etapa
    * de cadastro de um novo user pessoa física
    */
   @Transactional(readOnly = false)
   public void enviaConfirmacaoEmailNovoUsuario(String emailAddres, String novoUsuarioNome) {
      Optional<User> userOpt = repository.findByEmail(emailAddres);
      if (userOpt.isPresent()) {
         throw new DuplicateEmailException("O e-mail já está associado a uma conta.");
      } else {
         ConfirmationCode confirmationCode = confirmationCodeService.createConfirmationCodeEmail(emailAddres,
               novoUsuarioNome, ConfirmationType.EMAIL_CONFIRMATION);
         System.out.println("Código confirmação: " + confirmationCode.getCode());
         Email email = EmailUtils.getEmailConfirmationEmail(emailAddres, confirmationCode.getCode(),
               novoUsuarioNome);
         try {
            emailService.sendEmailWithTemplate(email);
            confirmationCode = confirmationCodeService.save(confirmationCode);
         } catch (Exception e) {
            e.printStackTrace();
            throw new EmailNotSendException("Não foi possível enviar o e-mail.");
         }
      }
   }

   /*
    * Para validação do codigo de confirmação de email no cadastro de usuário
    * pessoa física
    */
   // @Transactional(readOnly = false)
   // public void validaConfirmacaoEmailNovaConta(NovoUsuarioDto novoUsuario) {
   // CodigoConfirmacaoDto confirmationCodeDto =
   // novoUsuario.getCodigoConfirmacao();
   // Usuario user = novoUsuario.getUsuario();
   // CodigoConfirmacao confirmationCode =
   // confirmationCodeService.validaCodigoConfirmacao(
   // confirmationCodeDto.getCodigo(),
   // confirmationCodeDto.getEmail(),
   // ETipoConfirmacao.CONFIRMACAO_EMAIL);
   // user.setAtivo(true);
   // user.setBloqueado(false);
   // salvar(user);
   // confirmationCodeService.removerPorId(confirmationCode.getId());
   // }

   /*
    * Envia codigo de alteração de email
    */
   @Transactional(readOnly = false)
   public void enviaCodigoAlteracaoEmail(String emailAddres, Long userId) {
      // verificando se já existe um user com esse email
      isEmailUnic(emailAddres);
      // pegando o user da alteração
      User user = getById(userId);
      ConfirmationCode confirmationCode = confirmationCodeService
            .createConfirmationCodeEmail(emailAddres, user.getFirstName(),
                  ConfirmationType.EMAIL_ALTERATION);
      Email email = EmailUtils.getEmailConfirmationEmail(emailAddres, confirmationCode.getCode(),
            user.getLastName());
      emailService.sendEmailWithTemplate(email);
   }

   /*
    * Altera o email mediante codigo de confirmação
    */
   @Transactional(readOnly = false)
   public void updateEmail(EmailUpdateDto emailUpdate, Long userId) {
      ConfirmationCode confirmationCode = confirmationCodeService
            .valideConfirmationCode(emailUpdate.getCodigo(), emailUpdate.getEmail(),
                  ConfirmationType.EMAIL_ALTERATION);
      User user = getById(userId);
      if (user.isPasswordCorrect(emailUpdate.getSenha())) {
         user.setEmail(confirmationCode.getDestinationEmail());
         confirmationCodeService.removeById(confirmationCode.getId());
         repository.save(user);
      } else {
         throw new IncorrectPasswordException("A senha informada está incorreta.");
      }
   }

   /*
    * Envia um código de confirmação por email para permitir a redefinição de senha
    */
   @Transactional(readOnly = false)
   public void sendPasswordReset(String emailAddres) {
      User user = getByEmail(emailAddres);
      /*
       * verifica se já existe um código de redefinição, caso exista é realizado a
       * exclussão para envio de um novo
       */
      ConfirmationCode confirmationCode = confirmationCodeService
            .createConfirmationCodeEmail(emailAddres, user.getFirstName(), ConfirmationType.PASSWORD_RESET);

      Email email = EmailUtils.getPasswordResetEmail(confirmationCode.getCode(),
            user);
      emailService.sendEmailWithTemplate(email);
   }

   /*
    * Altera senha de user mediante codigo de confirmação
    */
   @Transactional(readOnly = false)
   public void resetPassword(PasswordResetDto passwordReset) {
      ConfirmationCode confirmationCode = confirmationCodeService
            .valideConfirmationCode(passwordReset.getCodigo(),
                  passwordReset.getEmail(), ConfirmationType.PASSWORD_RESET);
      User user = getByEmail(confirmationCode.getDestinationEmail());
      user.setPassword(passwordReset.getNovaSenha());
      confirmationCodeService.removeById(confirmationCode.getId());
      repository.save(user);
   }

   /*
    * Altera senha de user mediante senha atual
    */
   @Transactional(readOnly = false)
   public void updatePassword(PasswordUpdateDto alteracaoSenha, Long userId) {
      User user = getById(userId);
      if (user.isPasswordCorrect(alteracaoSenha.getCurrentPassword())) {
         user.setPassword(alteracaoSenha.getNewPassword());
         repository.save(user);
      } else
         throw new IncorrectPasswordException("A senha informada está incorreta.");
   }

   /*
    * Padrão do UserDetailService
    * Busca o usuário para login
    */
   @Override
   @Transactional(readOnly = true)
   public UserDetails loadUserByUsername(String username) {
      User user = getByUsername(username);
      return user;
   }
}
