const currentPage = location.pathname
const menuItems = document.querySelectorAll('header a')

for(item of menuItems){
  if(currentPage.includes(item.getAttribute("href"))){
    item.classList.add('active')
  }
}


let totalPages = 20,
    selectedPage = 5,
    page = [],
    oldPage

for(let currentPage = 1; currentPage <= totalPages; currentPage++){

  const firstAndLastPage = currentPage == 1 || currentPage ==totalPages
  const pageBeforeSelectedPage = currentPage >= selectedPage -2
  const pageAfterSelectedPage = currentPage <= selectedPage +2


  if(firstAndLastPage || pageBeforeSelectedPage && pageAfterSelectedPage){
    
      if(oldPage && (currentPage - oldPage > 2)){
        page.push('...')
      }

      if(oldPage && currentPage-oldPage == 2){
        page.push(oldPage + 1)
      }
      
      page.push(currentPage)
      oldPage = currentPage //último número add
      
    } 

  


}
console.log(page)