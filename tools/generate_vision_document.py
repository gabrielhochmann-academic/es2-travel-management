from pathlib import Path
from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_ALIGN_VERTICAL, WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Inches, Pt, RGBColor

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "docs/visao/Documento-de-Visao-SGV.docx"
LOGO = ROOT / "docs/visao/unioeste-logo.png"

NAVY = "172B4D"
BLUE = "1D70B8"
TEAL = "008A8A"
SKY = "EAF3FB"
MIST = "F5F8FC"
SLATE = "42526E"
MUTED = "6B778C"
WHITE = "FFFFFF"
GREEN = "167C4A"
AMBER = "B86E00"
RED = "B42318"


def set_cell_shading(cell, fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = tc_pr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tc_pr.append(shd)
    shd.set(qn("w:fill"), fill)


def set_cell_border(cell, **kwargs):
    tc = cell._tc
    tc_pr = tc.get_or_add_tcPr()
    tc_borders = tc_pr.first_child_found_in("w:tcBorders")
    if tc_borders is None:
        tc_borders = OxmlElement("w:tcBorders")
        tc_pr.append(tc_borders)
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        if edge in kwargs:
            edge_data = kwargs.get(edge)
            tag = "w:{}".format(edge)
            element = tc_borders.find(qn(tag))
            if element is None:
                element = OxmlElement(tag)
                tc_borders.append(element)
            for key in ["val", "sz", "space", "color"]:
                if key in edge_data:
                    element.set(qn("w:{}".format(key)), str(edge_data[key]))


def set_cell_margins(cell, top=100, start=110, bottom=100, end=110):
    tc = cell._tc
    tc_pr = tc.get_or_add_tcPr()
    tc_mar = tc_pr.first_child_found_in("w:tcMar")
    if tc_mar is None:
        tc_mar = OxmlElement("w:tcMar")
        tc_pr.append(tc_mar)
    for m, value in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        node = tc_mar.find(qn(f"w:{m}"))
        if node is None:
            node = OxmlElement(f"w:{m}")
            tc_mar.append(node)
        node.set(qn("w:w"), str(value))
        node.set(qn("w:type"), "dxa")


def set_repeat_table_header(row):
    tr_pr = row._tr.get_or_add_trPr()
    tbl_header = OxmlElement("w:tblHeader")
    tbl_header.set(qn("w:val"), "true")
    tr_pr.append(tbl_header)


def set_column_width(cell, width_cm):
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_w = tc_pr.find(qn("w:tcW"))
    if tc_w is None:
        tc_w = OxmlElement("w:tcW")
        tc_pr.append(tc_w)
    tc_w.set(qn("w:w"), str(int(width_cm * 567)))
    tc_w.set(qn("w:type"), "dxa")


def set_paragraph_spacing(paragraph, before=0, after=0, line=1.15):
    fmt = paragraph.paragraph_format
    fmt.space_before = Pt(before)
    fmt.space_after = Pt(after)
    fmt.line_spacing = line


def add_run(paragraph, text, bold=False, color=NAVY, size=10, italic=False):
    run = paragraph.add_run(text)
    run.bold = bold
    run.italic = italic
    run.font.name = "Aptos"
    run._element.rPr.rFonts.set(qn("w:eastAsia"), "Aptos")
    run.font.size = Pt(size)
    run.font.color.rgb = RGBColor.from_string(color)
    return run


def add_text(doc, text, size=10.5, color=SLATE, after=7, bold_prefix=None):
    paragraph = doc.add_paragraph()
    set_paragraph_spacing(paragraph, after=after, line=1.16)
    if bold_prefix and text.startswith(bold_prefix):
        add_run(paragraph, bold_prefix, bold=True, color=NAVY, size=size)
        add_run(paragraph, text[len(bold_prefix):], color=color, size=size)
    else:
        add_run(paragraph, text, color=color, size=size)
    return paragraph


def add_bullet(doc, text, level=0, color=SLATE):
    paragraph = doc.add_paragraph(style="SGV Bullet")
    paragraph.paragraph_format.left_indent = Cm(0.55 + (0.45 * level))
    paragraph.paragraph_format.first_line_indent = Cm(-0.3)
    set_paragraph_spacing(paragraph, after=3, line=1.1)
    add_run(paragraph, text, color=color, size=9.8)
    return paragraph


def add_section_label(doc, text):
    p = doc.add_paragraph()
    set_paragraph_spacing(p, before=12, after=4)
    add_run(p, text.upper(), bold=True, color=TEAL, size=8.5)
    return p


def add_heading(doc, number, title, subtitle=None):
    p = doc.add_paragraph()
    set_paragraph_spacing(p, before=2, after=5)
    add_run(p, f"{number}. ", bold=True, color=TEAL, size=16)
    add_run(p, title, bold=True, color=NAVY, size=16)
    if subtitle:
        add_text(doc, subtitle, size=9.7, color=MUTED, after=9)
    return p


def add_callout(doc, label, text, accent=BLUE):
    table = doc.add_table(rows=1, cols=1)
    table.autofit = False
    cell = table.cell(0, 0)
    set_cell_shading(cell, MIST)
    set_cell_margins(cell, top=140, start=180, bottom=130, end=180)
    set_cell_border(cell, left={"val": "single", "sz": 18, "color": accent})
    cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
    p = cell.paragraphs[0]
    set_paragraph_spacing(p, after=2, line=1.1)
    add_run(p, label.upper() + "  ", bold=True, color=accent, size=8.5)
    add_run(p, text, color=SLATE, size=9.5)
    doc.add_paragraph().paragraph_format.space_after = Pt(1)
    return table


def add_table(doc, headers, rows, widths=None, font_size=8.8):
    table = doc.add_table(rows=1, cols=len(headers))
    table.autofit = False
    table.style = "Table Grid"
    table.alignment = WD_ALIGN_PARAGRAPH.CENTER
    header_cells = table.rows[0].cells
    for idx, header in enumerate(headers):
        cell = header_cells[idx]
        set_cell_shading(cell, NAVY)
        set_cell_margins(cell, top=90, start=90, bottom=90, end=90)
        cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
        if widths:
            set_column_width(cell, widths[idx])
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        set_paragraph_spacing(p, after=0, line=1.0)
        add_run(p, header, bold=True, color=WHITE, size=8.2)
    set_repeat_table_header(table.rows[0])
    for row_index, row in enumerate(rows):
        cells = table.add_row().cells
        fill = WHITE if row_index % 2 == 0 else MIST
        for idx, value in enumerate(row):
            cell = cells[idx]
            set_cell_shading(cell, fill)
            set_cell_margins(cell, top=85, start=90, bottom=85, end=90)
            cell.vertical_alignment = WD_ALIGN_VERTICAL.TOP
            if widths:
                set_column_width(cell, widths[idx])
            p = cell.paragraphs[0]
            set_paragraph_spacing(p, after=0, line=1.05)
            add_run(p, str(value), color=SLATE, size=font_size)
    doc.add_paragraph().paragraph_format.space_after = Pt(2)
    return table


def add_stat_row(doc, stats):
    table = doc.add_table(rows=1, cols=len(stats))
    table.autofit = False
    for index, (number, label, color) in enumerate(stats):
        cell = table.cell(0, index)
        set_cell_shading(cell, MIST)
        set_cell_border(cell, bottom={"val": "single", "sz": 12, "color": color})
        set_cell_margins(cell, top=120, start=120, bottom=120, end=120)
        p = cell.paragraphs[0]
        set_paragraph_spacing(p, after=2, line=1.0)
        add_run(p, number, bold=True, color=color, size=16)
        p2 = cell.add_paragraph()
        set_paragraph_spacing(p2, after=0, line=1.0)
        add_run(p2, label.upper(), bold=True, color=MUTED, size=7.4)
    doc.add_paragraph().paragraph_format.space_after = Pt(2)


def add_problem_cards(doc, cards):
    table = doc.add_table(rows=0, cols=2)
    table.autofit = False
    for idx, (title, description, color) in enumerate(cards):
        if idx % 2 == 0:
            row = table.add_row()
        cell = row.cells[idx % 2]
        set_cell_shading(cell, MIST)
        set_cell_border(cell, top={"val": "single", "sz": 8, "color": color})
        set_cell_margins(cell, top=130, start=130, bottom=130, end=130)
        p = cell.paragraphs[0]
        set_paragraph_spacing(p, after=3, line=1.0)
        add_run(p, title, bold=True, color=NAVY, size=9.3)
        p2 = cell.add_paragraph()
        set_paragraph_spacing(p2, after=0, line=1.08)
        add_run(p2, description, color=SLATE, size=8.5)
    doc.add_paragraph().paragraph_format.space_after = Pt(3)


def add_header_footer(section):
    header = section.header
    paragraph = header.paragraphs[0]
    paragraph.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    set_paragraph_spacing(paragraph, after=0)
    add_run(paragraph, "SGV  |  DOCUMENTO DE VISÃO", bold=True, color=TEAL, size=8)
    footer = section.footer
    paragraph = footer.paragraphs[0]
    paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_paragraph_spacing(paragraph, before=2, after=0)
    add_run(paragraph, "Sistema de Gestão de Viagens  •  Documento de Visão  •  Sprint 0  |  ", color=MUTED, size=7.5)
    field = OxmlElement("w:fldSimple")
    field.set(qn("w:instr"), "PAGE")
    paragraph._p.append(field)


def configure_document(doc):
    section = doc.sections[0]
    section.top_margin = Cm(1.7)
    section.bottom_margin = Cm(1.55)
    section.left_margin = Cm(1.8)
    section.right_margin = Cm(1.8)
    section.header_distance = Cm(0.65)
    section.footer_distance = Cm(0.65)
    add_header_footer(section)

    styles = doc.styles
    normal = styles["Normal"]
    normal.font.name = "Aptos"
    normal._element.rPr.rFonts.set(qn("w:eastAsia"), "Aptos")
    normal.font.size = Pt(10)
    normal.font.color.rgb = RGBColor.from_string(SLATE)

    bullet = styles.add_style("SGV Bullet", WD_STYLE_TYPE.PARAGRAPH)
    bullet.base_style = styles["Normal"]
    bullet.font.name = "Aptos"
    bullet.font.size = Pt(9.8)
    bullet._element.rPr.rFonts.set(qn("w:eastAsia"), "Aptos")
    bullet.paragraph_format.left_indent = Cm(0.55)
    bullet.paragraph_format.first_line_indent = Cm(-0.3)


def add_cover(doc):
    section = doc.sections[0]
    section.header.is_linked_to_previous = False
    section.footer.is_linked_to_previous = False

    spacer = doc.add_paragraph()
    spacer.paragraph_format.space_after = Pt(24)
    if LOGO.exists():
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run()
        run.add_picture(str(LOGO), width=Cm(5.0))
        set_paragraph_spacing(p, after=22)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_paragraph_spacing(p, after=7)
    add_run(p, "DOCUMENTO DE VISÃO", bold=True, color=TEAL, size=12)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_paragraph_spacing(p, after=8)
    add_run(p, "Sistema de Gestão de", bold=True, color=NAVY, size=28)
    p2 = doc.add_paragraph()
    p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_paragraph_spacing(p2, after=20)
    add_run(p2, "Viagens", bold=True, color=BLUE, size=28)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_paragraph_spacing(p, after=32)
    add_run(p, "Uma visão clara para organizar solicitações, decisões e informações gerenciais sobre viagens corporativas.", color=SLATE, size=11, italic=True)

    table = doc.add_table(rows=1, cols=2)
    table.autofit = False
    left, right = table.rows[0].cells
    for cell in (left, right):
        set_cell_shading(cell, MIST)
        set_cell_margins(cell, top=140, start=160, bottom=140, end=160)
    p = left.paragraphs[0]
    set_paragraph_spacing(p, after=3)
    add_run(p, "DISCIPLINA", bold=True, color=TEAL, size=7.5)
    p = left.add_paragraph()
    set_paragraph_spacing(p, after=0)
    add_run(p, "Engenharia de Software II — ESII", color=NAVY, size=9.3)
    p = right.paragraphs[0]
    set_paragraph_spacing(p, after=3)
    add_run(p, "VERSÃO", bold=True, color=TEAL, size=7.5)
    p = right.add_paragraph()
    set_paragraph_spacing(p, after=0)
    add_run(p, "1.1  •  Sprint 0  •  25/08/2026", color=NAVY, size=9.3)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_paragraph_spacing(p, before=38, after=5)
    add_run(p, "UNIOESTE  •  Universidade Estadual do Oeste do Paraná", bold=True, color=NAVY, size=9)
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_paragraph_spacing(p, after=0)
    add_run(p, "Professor responsável: Willian Francisco da Silva", color=MUTED, size=8.5)
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_paragraph_spacing(p, before=24, after=0)
    add_run(p, "Autores: Gabriel Hochmann Alves  •  Angelo Vilani  •  Diogo Rafael Jardim Melo Pasa", color=SLATE, size=8.5)

    doc.add_page_break()


def add_document_content(doc):
    add_section_label(doc, "Leitura executiva")
    add_heading(doc, "1", "Resumo do produto", "O SGV centraliza o ciclo de vida das viagens corporativas em uma experiência única e rastreável.")
    add_text(doc, "O Sistema de Gestão de Viagens (SGV) é uma aplicação web destinada ao planejamento, à solicitação, à aprovação e ao acompanhamento de viagens corporativas. A solução reduz a dependência de planilhas e mensagens dispersas ao consolidar informações operacionais e gerenciais em um único ambiente.")
    add_callout(doc, "Visão do produto", "Permitir que colaboradores planejem viagens com clareza e que gestores tomem decisões com informações organizadas, rastreáveis e disponíveis no momento certo.")
    add_stat_row(doc, [("2", "perfis principais", TEAL), ("4", "situações da viagem", BLUE), ("5", "necessidades prioritárias", GREEN)])

    add_heading(doc, "2", "Problemas que a solução endereça")
    add_problem_cards(doc, [
        ("Informação dispersa", "Viagens registradas em planilhas e e-mails dificultam a consulta e o acompanhamento.", BLUE),
        ("Decisão sem transparência", "A ausência de um fluxo formal gera incerteza sobre a situação de cada solicitação.", TEAL),
        ("Gastos pouco visíveis", "Sem consolidação por viagem, gestores perdem referência para acompanhar despesas.", AMBER),
        ("Baixa visão gerencial", "Dados não estruturados limitam a análise de volumes, custos e tendências.", RED),
    ])
    add_text(doc, "A proposta do SGV é transformar essas necessidades em um fluxo controlado: cadastro centralizado, submissão para análise, decisão do gestor, registro de despesas autorizadas e consulta de informações relevantes.", after=9)

    add_heading(doc, "3", "Escopo e proposta de valor")
    add_text(doc, "O escopo contempla o registro de viagens com destino, período, motivo, meio de transporte e responsável; o controle do ciclo de vida da solicitação; o registro de despesas após aprovação; as pesquisas por destino, período e situação; e a disponibilização de indicadores gerenciais.")
    add_table(doc, ["Incluído nesta visão", "Fora do escopo atual"], [
        ("Planejamento, registro e acompanhamento de viagens corporativas.", "Integrações com ERP, emissão de passagens, pagamento eletrônico e autenticação corporativa."),
        ("Fluxo de rascunho, solicitação, aprovação e rejeição.", "Automação de processos dependentes de sistemas externos."),
        ("Registro de despesas em viagens aprovadas e consultas gerenciais.", "Definição de integrações corporativas além da aplicação web própria."),
    ], widths=[8.2, 8.2], font_size=8.8)

    add_section_label(doc, "Pessoas e jornadas")
    add_heading(doc, "4", "Quem utiliza o SGV")
    add_table(doc, ["Perfil", "Necessidade principal", "Valor entregue"], [
        ("Colaborador", "Planejar, registrar e acompanhar suas viagens.", "Mais clareza sobre o andamento da solicitação e dados organizados em um único local."),
        ("Gestor", "Analisar solicitações, decidir e acompanhar informações gerenciais.", "Decisões com contexto, visibilidade sobre gastos e controle do fluxo."),
    ], widths=[3.0, 6.4, 7.0], font_size=8.7)

    add_heading(doc, "5", "Fluxo de negócio prioritário")
    add_table(doc, ["Etapa", "Resultado esperado", "Responsável"], [
        ("1. Planejamento", "A viagem é registrada com os dados necessários e inicia como Rascunho.", "Colaborador"),
        ("2. Submissão", "A solicitação é encaminhada para análise do gestor.", "Colaborador"),
        ("3. Decisão", "A viagem é aprovada ou rejeitada conforme a análise.", "Gestor"),
        ("4. Controle financeiro", "Despesas podem ser registradas somente para viagens aprovadas.", "Colaborador / Gestor"),
        ("5. Acompanhamento", "Consultas e indicadores apoiam o acompanhamento de viagens e gastos.", "Gestor"),
    ], widths=[3.0, 9.0, 4.4], font_size=8.5)
    add_callout(doc, "Integrações", "Não há integração externa prevista no escopo atual. O SGV será desenvolvido como uma aplicação web própria, composta por frontend, backend e banco de dados.", accent=TEAL)

    doc.add_page_break()
    add_section_label(doc, "Necessidades e requisitos")
    add_heading(doc, "6", "Necessidades do negócio")
    add_table(doc, ["Código", "Necessidade", "Benefício esperado"], [
        ("NEC01", "Centralizar o cadastro e o acompanhamento de viagens corporativas.", "Informação consistente e acessível."),
        ("NEC02", "Controlar o fluxo de submissão, aprovação e rejeição.", "Situação da solicitação clara para todos os envolvidos."),
        ("NEC03", "Registrar e consolidar despesas associadas a viagens aprovadas.", "Maior visibilidade financeira por viagem."),
        ("NEC04", "Permitir pesquisas por destino, período e situação.", "Localização rápida de informações."),
        ("NEC05", "Disponibilizar indicadores sobre viagens e gastos.", "Apoio à tomada de decisão gerencial."),
    ], widths=[2.0, 8.1, 6.3], font_size=8.4)

    add_heading(doc, "7", "Requisitos priorizados")
    add_table(doc, ["Código", "Tipo", "Requisito", "Regra ou descrição"], [
        ("RF01", "Funcional", "Planejar viagem", "Cadastrar, consultar, alterar e excluir viagens não aprovadas."),
        ("RF02", "Funcional", "Controlar aprovação", "Submeter viagens e permitir decisão de aprovação ou rejeição."),
        ("RF03", "Funcional", "Controlar despesas", "Registrar despesas somente em viagens aprovadas e consolidar o valor total."),
        ("RF04", "Funcional", "Pesquisar viagens", "Pesquisar viagens por destino, período e situação."),
        ("RF05", "Funcional", "Exibir informações gerenciais", "Apresentar indicadores sobre viagens e custos."),
        ("RNF01", "Não funcional", "Aplicação web em camadas", "Separar frontend, backend e banco de dados com comunicação REST."),
        ("RNF02", "Não funcional", "Execução conteinerizada", "Executar os serviços com Docker e preservar os dados cadastrados."),
    ], widths=[1.8, 2.5, 4.1, 8.0], font_size=7.9)

    doc.add_page_break()
    add_section_label(doc, "Viabilidade e orientação técnica")
    add_heading(doc, "8", "Regras e restrições")
    add_table(doc, ["Categoria", "Diretriz"], [
        ("Regra de negócio", "A data de retorno deve ser igual ou posterior à data de saída."),
        ("Regra de negócio", "Destino e motivo são obrigatórios no cadastro da viagem."),
        ("Regra de negócio", "Somente viagens aprovadas podem receber lançamentos de despesas."),
        ("Regra de negócio", "Toda alteração de situação deve ser mantida no histórico da viagem."),
        ("Restrição técnica", "A solução será uma aplicação web com frontend, backend e banco de dados separados."),
        ("Restrição técnica", "O ambiente utilizará React, TypeScript, Vite, Spring Boot, Java 21, PostgreSQL e Docker Compose."),
    ], widths=[3.2, 13.2], font_size=8.5)

    add_heading(doc, "9", "Configuração da solução")
    add_table(doc, ["Camada", "Tecnologia", "Responsabilidade"], [
        ("Frontend", "React, TypeScript e Vite", "Disponibilizar a experiência web do SGV."),
        ("Backend", "Spring Boot e Java 21", "Expor regras de negócio e API REST."),
        ("Banco de dados", "PostgreSQL 16", "Persistir as informações de viagens."),
        ("Operação", "Docker e Docker Compose", "Executar os serviços de forma integrada."),
        ("Gestão", "Git, GitHub e Jira", "Versionar artefatos e acompanhar o trabalho da equipe."),
    ], widths=[3.0, 5.2, 8.2], font_size=8.5)
    add_text(doc, "Para a execução local, o ambiente requer Docker Desktop. Após a configuração, o comando docker compose up --build inicia os serviços: interface na porta 5173, API na porta 8080 e PostgreSQL na porta 5432.", after=10)

    add_section_label(doc, "Governança do documento")
    add_heading(doc, "10", "Histórico de versões")
    add_table(doc, ["Versão", "Data", "Alteração", "Autores"], [
        ("1.0", "23/08/2026", "Primeira versão do documento.", "Gabriel Hochmann Alves; Angelo Vilani; Diogo Rafael Jardim Melo Pasa"),
        ("1.1", "25/08/2026", "Reformulação visual e executiva dos artefatos da Sprint 0.", "Gabriel Hochmann Alves; Angelo Vilani; Diogo Rafael Jardim Melo Pasa"),
    ], widths=[2.0, 2.8, 6.4, 5.2], font_size=8.0)
    add_callout(doc, "Referência", "Este documento consolida a Especificação de Requisitos do Sistema de Gestão de Viagens e os materiais de aula da disciplina de Engenharia de Software II.", accent=BLUE)


def main():
    doc = Document()
    configure_document(doc)
    add_cover(doc)
    add_document_content(doc)
    doc.core_properties.title = "Documento de Visão — Sistema de Gestão de Viagens"
    doc.core_properties.subject = "Visão executiva e requisitos do SGV"
    doc.core_properties.author = "Gabriel Hochmann Alves; Angelo Vilani; Diogo Rafael Jardim Melo Pasa"
    doc.core_properties.keywords = "SGV, viagens corporativas, documento de visão, Sprint 0"
    doc.save(OUTPUT)
    print(OUTPUT)


if __name__ == "__main__":
    main()
