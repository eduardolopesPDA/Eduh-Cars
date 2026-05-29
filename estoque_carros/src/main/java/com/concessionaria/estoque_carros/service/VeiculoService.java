// Caminho: src/main/java/com/concessionaria/estoque_carros/service/VeiculoService.java
package com.concessionaria.estoque_carros.service;

import com.concessionaria.estoque_carros.model.Status;
import com.concessionaria.estoque_carros.model.Veiculo;
import com.concessionaria.estoque_carros.repository.VeiculoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VeiculoService {

    private final VeiculoRepository repository;

    public VeiculoService(VeiculoRepository repository) {
        this.repository = repository;
    }

    public Veiculo cadastrar(Veiculo veiculo) {
        if (veiculo.getPreco() != null && veiculo.getPreco() < 0) {
            throw new IllegalArgumentException("Preço não pode ser menor que zero.");
        }
        if (veiculo.getQuilometragem() != null && veiculo.getQuilometragem() < 0) {
            throw new IllegalArgumentException("Quilometragem não pode ser menor que zero.");
        }
        if (veiculo.getStatus() == null) {
            veiculo.setStatus(Status.DISPONIVEL);
        }
        return repository.save(veiculo);
    }

    public List<Veiculo> listarTodos() {
        return repository.findAll();
    }

    public List<Veiculo> buscarPorMarca(String marca) {
        return repository.findByMarca(marca);
    }

    public List<Veiculo> buscarPorStatus(Status status) {
        return repository.findByStatus(status);
    }

    public List<Veiculo> buscarPorAno(Integer anoFabricacao) {
        return repository.findByAnoFabricacao(anoFabricacao);
    }

    public Optional<Veiculo> atualizar(Long id, Veiculo atualizacao) {
        return repository.findById(id).map(veiculo -> {
            if (atualizacao.getPreco() != null) {
                if (atualizacao.getPreco() < 0) {
                    throw new IllegalArgumentException("Preço não pode ser menor que zero.");
                }
                veiculo.setPreco(atualizacao.getPreco());
            }
            if (atualizacao.getQuilometragem() != null) {
                if (atualizacao.getQuilometragem() < 0) {
                    throw new IllegalArgumentException("Quilometragem não pode ser menor que zero.");
                }
                veiculo.setQuilometragem(atualizacao.getQuilometragem());
            }
            if (atualizacao.getStatus() != null) {
                veiculo.setStatus(atualizacao.getStatus());
            }
            return repository.save(veiculo);
        });
    }

    public Optional<Veiculo> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
