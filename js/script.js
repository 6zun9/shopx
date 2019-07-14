
function showMenu(){
 //toggle button added for main menu
  var element = document.getElementById('show-sidebar');
  element.classList.toggle('active');
  var sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');


//page scroll disalbe when mobile menu apperas
  if(element.classList.contains('active')){
    document.body.style.overflow ='hidden';
  }else{
    document.body.style.overflow='auto';
  }

}
function showFilterMenu(){
  //mobile filter menu control

  var filter = document.querySelector('#filter-burger-icon');
  var filterMenu = document.querySelector('.mobile-filter-nav');
  filter.classList.toggle('active');
  if(filter.classList.contains('active')){
      filterMenu.style.display='block';
  }else{
    filterMenu.style.display ='none';
  }
}
