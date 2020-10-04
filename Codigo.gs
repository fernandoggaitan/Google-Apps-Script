const SS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/[ID-DE-TU-HOJA-DE-CALCULOS]/edit#gid=0");

function doGet() {
  let layout = HtmlService.createTemplateFromFile("layout");
  return layout.evaluate();
}

function getCategorias(){
  
  let ws = SS.getSheetByName("Categorias");
  
  let data = ws.getRange(
    2, 
    1, 
    ws.getLastRow() - 1, 
    1
  ).getValues();
      
  return data;
  
}

function addItemMenu(p_item){
  
  let ws = SS.getSheetByName("Menu");
  
  let date = new Date();
  
  ws.appendRow([
	getIdDinamico(),
    p_item.nombre,
    p_item.descripcion,
    p_item.categoria,
    date,
    date
  ]);
  
}

function updateItemMenu(p_item){
  
  let ws = SS.getSheetByName("Menu");
  
  let fila = getFilaPorId(p_item.ID);
  
  if(fila > -1){
    ws.getRange(fila, 2).setValue(p_item.nombre);
    ws.getRange(fila, 3).setValue(p_item.descripcion);
    ws.getRange(fila, 4).setValue(p_item.categoria);
    return true;
  }else{
    return false;
  }
  
}

function deleteItemMenu(p_item){
  
  let ws = SS.getSheetByName("Menu");
  
  let fila = getFilaPorId(p_item.ID);
  
  if(fila > -1){
    ws.deleteRow(fila);
    return true;
  }else{
    return false;
  }
  
}
    
function getIdDinamico(){
        
    return new Date().getTime() + '-' + (Math.floor(Math.random() * 100) + 1);
    
}

function getMenu(){
  
  let ws = SS.getSheetByName("Menu");
  
  let data = ws.getRange(
    2, 
    1,
    ws.getLastRow() - 1, 
    4
  ).getValues();
      
  return data;
    
}

function getMenuFiltrado(p_texto_busqueda){
  
  let menu = getMenu();
  let menu_filtrado = [];
  
  for(let i = 0; i < menu.length; i++){
    if(buscarEnTexto(menu[i][1], p_texto_busqueda) || buscarEnTexto(menu[i][2], p_texto_busqueda) || buscarEnTexto(menu[i][3], p_texto_busqueda)){
      menu_filtrado.push(menu[i]);
    }
  }
    
  return menu_filtrado;
  
}

function buscarEnTexto(p_texto, p_texto_busqueda){
  return p_texto.toLowerCase().indexOf(p_texto_busqueda.toLowerCase()) > -1;
}

function getFilaPorId(p_id){
    
  let menu = getMenu();
  
  let ides = menu.map(function(e){
    return e[0];
  });
    
  let fila = ides.indexOf(p_id);
  
  if(fila > -1){
    fila += 2;
  }
  
  return fila;  
  
}