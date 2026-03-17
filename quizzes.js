window.QUIZZES = {}

/* --- Grafana --- */
window.QUIZZES.grafana = {
  meta: { title:"Cuestionario Nº1 · Grafana", subtitle:"Observabilidad y dashboards" },
  items: [
    { q:"¿Qué herramienta…?", o:["Logstash","Kibana","Apache Superset","Grafana"], a:3 },
    { q:"¿Qué destaca…?", o:["Solo SQL","No alertas","Múltiples fuentes","Solo logs"], a:2 },
    { q:"¿Qué puede mostrar…?", o:["Solo logs","Solo CPU","Gráficos, tablas…","SO"], a:2 },
    { q:"¿Compatibilidad…?", o:["Windows","Linux","Muchos sistemas","Android"], a:2 },
    { q:"¿Punto fuerte…?", o:["Audio","Reconocimiento","Multi origen","Compilar"], a:2 },
    { q:"Grafana es…", o:["BD","Observabilidad","Cloud","Lenguaje"], a:1 },
    { q:"Característica", o:["Encriptación","Alertas","Almacenamiento","ML"], a:1 },
    { q:"Plantilla", o:["Estático","Variables","Fuente","PDF"], a:1 },
    { q:"Grafana vs Kibana", o:["Métricas vs logs","Libre vs no","Visualiza vs ingesta","Iguales"], a:0 },
    { q:"Métricas", o:["Cualitativos","Cuantitativos","Logs","Feedback"], a:1 }
  ]
}

/* --- Elastic --- */
window.QUIZZES.elastic = {
  meta: { title:"Cuestionario · Elastic (ELK)", subtitle:"Elasticsearch, Logstash y Kibana" },
  items: [
    { q:"¿Qué compone ELK?", o:["Kubernetes","Logstash","PostgreSQL","Nginx"], a:1 },
    { q:"Motor base ES", o:["Lucene","Solr","Sphinx","OpenSearch"], a:0 },
    { q:"Arquitectura ES", o:["Cliente‑servidor","Monolítica","Distribuida","Eventos"], a:2 },
    { q:"Visualización", o:["ES","Kibana","Grafana","Logstash"], a:1 },
    { q:"Verdadero Kibana", o:["No UI","No grafana","Consulta ES","Java"], a:2 },
    { q:"Acceso ES", o:["SSH","SOAP","REST","Kibana"], a:2 },
    { q:"Consulta compleja", o:["DSL","SQL","GraphQL","Bash"], a:0 },
    { q:"KQL hace…", o:["Bash","Lucene directo","Convierte a DSL","Ignora"], a:2 },
    { q:"Eliminar índice", o:["DELETE document","REMOVE","DELETE /indice","DROP"], a:2 },
    { q:"Formato DSL", o:["XML","YAML","JSON","CSV"], a:2 },
    { q:"Desde Kibana", o:["Python","Administrar cluster","Compilar ES","PDF"], a:1 }
  ]
}
