// Caminho: src/main/java/com/concessionaria/estoque_carros/repository/VeiculoRepository.java
package com.concessionaria.estoque_carros.repository;

import com.concessionaria.estoque_carros.model.Status;
import com.concessionaria.estoque_carros.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    List<Veiculo> findByMarca(String marca);
    List<Veiculo> findByStatus(Status status);
    List<Veiculo> findByAnoFabricacao(Integer anoFabricacao);
}
