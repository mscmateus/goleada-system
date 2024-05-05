package com.goleada.goleada.models;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Email {
   private String to;
   private String from;
   private String subject;
   private String content;
   private String template;
   private Map<String, Object> model;
}
