package com.goleada.goleada.services;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.goleada.goleada.exceptions.EmailNotSendException;
import com.goleada.goleada.models.Email;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

   @Autowired
   private JavaMailSender emailSender;
   @Autowired
   private Configuration fmConfiguration;

   public void sendEmailWithTemplate(Email mail) {
      MimeMessage mimeMessage = emailSender.createMimeMessage();
      try {
         MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
         mimeMessageHelper.setSubject(mail.getSubject());
         mimeMessageHelper.setFrom(mail.getFrom());
         mimeMessageHelper.setTo(mail.getTo());
         mail.setContent(getContentFromTemplate(mail.getModel(), mail.getTemplate()));
         mimeMessageHelper.setText(mail.getContent(), true);
         emailSender.send(
               mimeMessageHelper.getMimeMessage());
         System.out.println("E-mail enviado para " + mail.getTo());
      } catch (MessagingException | IOException | TemplateException e) {
         throw new EmailNotSendException("Não foi possível enviar o e-mail");
      }
   }

   public String getContentFromTemplate(Map<String, Object> model, String template) throws TemplateNotFoundException,
         MalformedTemplateNameException, ParseException, IOException, TemplateException {
      StringBuffer content = new StringBuffer();
      content.append(FreeMarkerTemplateUtils
            .processTemplateIntoString(fmConfiguration.getTemplate(template), model));
      return content.toString();
   }
}
