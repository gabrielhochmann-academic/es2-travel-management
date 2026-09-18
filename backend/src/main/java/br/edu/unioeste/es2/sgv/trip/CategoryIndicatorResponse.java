package br.edu.unioeste.es2.sgv.trip;

import java.math.BigDecimal;

/** Total acumulado de uma categoria de custo (deslocamento, hospedagem ou táxi). */
public record CategoryIndicatorResponse(String category, BigDecimal total) { }
