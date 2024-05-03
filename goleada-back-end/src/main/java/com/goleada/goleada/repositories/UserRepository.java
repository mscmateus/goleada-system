package com.goleada.goleada.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.goleada.goleada.models.entitys.User;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE (cast(UNACCENT(UPPER(u.username)) as text) LIKE cast('%'||UNACCENT(UPPER(:search))||'%' as text)) OR (u.cpf LIKE :search||'%')")
    public Page<User> searchUser(@Param("search") String search, Pageable pageable);

    public Optional<User> findByUsername(String username);

    public Optional<User> findByCpf(String cpf);

    public Optional<User> findByEmail(String email);

}
