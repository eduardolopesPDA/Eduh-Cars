// Caminho: src/main/java/com/concessionaria/estoque_carros/controller/VeiculoController.java
package com.concessionaria.estoque_carros.controller;

import com.concessionaria.estoque_carros.model.Status;
import com.concessionaria.estoque_carros.model.Veiculo;
import com.concessionaria.estoque_carros.service.VeiculoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/veiculos")
public class VeiculoController {

    private final VeiculoService service;

    public VeiculoController(VeiculoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Veiculo> cadastrar(@RequestBody Veiculo veiculo) {
        Veiculo salvo = service.cadastrar(veiculo);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Veiculo>> listar(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Integer anoFabricacao
    ) {
        if (marca != null) {
            return ResponseEntity.ok(service.buscarPorMarca(marca));
        }
        if (status != null) {
            return ResponseEntity.ok(service.buscarPorStatus(status));
        }
        if (anoFabricacao != null) {
            return ResponseEntity.ok(service.buscarPorAno(anoFabricacao));
        }
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> atualizar(@PathVariable Long id, @RequestBody Veiculo veiculo) {
        return service.atualizar(id, veiculo)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
