package br.edu.unioeste.es2.sgv.trip;

import jakarta.validation.constraints.NotNull;

public record DecisionRequest(@NotNull TripStatus status, String justification) { }
