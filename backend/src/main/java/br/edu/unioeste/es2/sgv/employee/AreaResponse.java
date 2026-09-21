package br.edu.unioeste.es2.sgv.employee;

import java.util.UUID;

public record AreaResponse(UUID id, String name) {
    static AreaResponse from(Area area) {
        return new AreaResponse(area.getId(), area.getName());
    }
}
