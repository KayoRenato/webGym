const currentPage = location.pathname
const menuItems = document.querySelectorAll('header a')


for(item of menuItems){
  if(currentPage.includes(item.getAttribute("href"))){
    item.classList.add('active')
  }
}

function paginate(selectedPage, totalPages){

  let pages = [],
      oldPage
  
  for(let currentPage = 1; currentPage <= totalPages; currentPage++){
  
    const firstAndLastPage = currentPage == 1 || currentPage ==totalPages
    const pageBeforeSelectedPage = currentPage >= selectedPage -2
    const pageAfterSelectedPage = currentPage <= selectedPage +2
  
    if(firstAndLastPage || pageBeforeSelectedPage && pageAfterSelectedPage){
      
        if(oldPage && (currentPage - oldPage > 2)){
          pages.push('...')
        }
  
        if(oldPage && currentPage-oldPage == 2){
          pages.push(oldPage + 1)
        }
        
        pages.push(currentPage)
        oldPage = currentPage //último número add
        
      } 
  }

    return pages
}

function createPagination(pagination){

  const page = +pagination.dataset.page 
  const total = +pagination.dataset.total
  const filter = pagination.dataset.filter
  const pages = paginate(page, total)
  
  let elements = ""
  
  for(let page of pages){
  
    if(String(page).includes("...")){
      elements += `<span>${page}</span>`
    }else{
      if(filter){
        elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
      }else{
        elements += `<a href="?page=${page}">${page}</a>`
      }
    }
  }
  
  pagination.innerHTML = elements

}

const pagination = document.querySelector('.pagination')

if(pagination){
  
  createPagination(pagination)
  const pageOfPages = document.querySelectorAll('.pagination a')
  const pgCurrent = pagination.dataset.page

  for(let page of pageOfPages){
    if(pgCurrent == page.textContent){
      page.classList.add('active')
    }
  }
}