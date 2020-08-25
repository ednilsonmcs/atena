# Atena (API)

Este um projeto que tem como objetivo executar as funcionalidades de um ETL (Extract, Transform and Load) em arquvios referentes ocorrências registradas,através de chamados, pelo Centro Integrado de Operaçes em Segurança Pública de Sergipe (CIOSP-SE).

## Configurando a Aplicação
1. Requisitos Minimos
  * MySQL v. 8.0.20 
  * Node
    * exceljs: ^3.9.0,
    * express: ^4.17.1,
    * lodash: ^4.17.19,
    * moment: ^2.26.0,
    * multer: ^1.4.2,
    * mysql2: ^2.1.0,
    * nodemon: ^2.0.4,
    * sequelize: ^5.21.9
2. Banco de Dados
  * Esquemas
    * sa: Stagin Area,
    * dw: Data Warehouse
  * Tabelas
    * SequelizeMeta,
    * dw.dim_descricao_finalizacao,
    * dw.dim_endereco,
    * dw.dim_tempo,
    * dw.dim_termo,
    * dw.dim_tipo,
    * dw.fato_chamado,
    * dw.fato_termo,
    * dw.junk_descricao,
    * sa.chamados,
    * sa.fonte,
    * sa.itensfonte