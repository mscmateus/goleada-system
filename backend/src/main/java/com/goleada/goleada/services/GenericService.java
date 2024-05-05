package com.goleada.goleada.services;

import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import com.goleada.goleada.exceptions.ItemNotDeletedException;
import com.goleada.goleada.exceptions.ItemNotFoundException;

/*
 * Essa é uma classe abstrata para reunir os métodos basicos de um service genérico
 */
@Service
public abstract class GenericService<T> {

   private JpaRepository<T, Long> repository;

   public GenericService(JpaRepository<T, Long> repository) {
      this.repository = repository;
   }

   @Transactional(readOnly = true)
   public T getById(Long id) {
      Optional<T> optResult = repository.findById(id);
      if (optResult.isPresent()) {
         return optResult.get();
      } else {
         throw new ItemNotFoundException("Elemento com ID = " + id + " não encontrado");
      }
   }

   @Transactional(readOnly = true)
   public List<T> getAll() {
      return repository.findAll();
   }

   @Transactional(readOnly = false)
   public T save(T entity) {
      return repository.save(entity);
   }

   @Transactional(readOnly = false)
   public void removeById(long id) {
      try {
         repository.deleteById(id);
      } catch (DataIntegrityViolationException e) {
         throw new ItemNotDeletedException("Não foi possível excluir o item com ID = " + id
               + " certifique-se que ele não está associado a outros itens");
      }
   }

}
