console.log(`support js`)
let ticketid = 0

if(support_attachment = document.getElementById('support_attachment')){
    const support_attachment = document.getElementById('support_attachment')
support_attachment.addEventListener('change' , function(e){
    document.getElementById('uploaded-file-name').innerHTML = e.target.files[0].name  
})}


const allTD = document.querySelectorAll('td')
allTD.forEach(td => {if(td.classList[0] != "action") td.innerHTML.length >24 ? td.innerHTML = td.innerHTML.slice(0,24)+"...." : td.innerHTML = td.innerHTML})
    $(document).ready(function() {
        var tableOptions = {
            
            'paging': true,
            'lengthChange': false,
            'searching': false,
            'ordering': true,
            'info': true,
            'autoWidth': true,
            "bSort": true,
            pageLength: 6
        };
    
        // Check if the screen width is less than 760px
        if (window.innerWidth < 760) {
            tableOptions.scrollX = true;  // Enable scrollX if the screen width is less than 760px
        }
        // Initialize the DataTable with the dynamic options
        $('#example2').DataTable(tableOptions);
    });// for resolve click and its model in listing page
const resolvebtn = document.querySelectorAll('.resolve-btn')
resolvebtn.forEach(singleResolve => {
    singleResolve.addEventListener('click' , function(e){
        e.preventDefault()
        const hrefValue = e.target.getAttribute('href'); // T
        let ticketid =  hrefValue.split('/')[0]
        let tickettitle =  hrefValue.split('/')[1]
        document.getElementById('resolve-ticket-id').value = ticketid 
        document.getElementById('modal-ticket-title').innerHTML = tickettitle
        $('#commentsModal').modal('show');
    })
})
let  form = document.querySelector('form')
if(form)
form.addEventListener('submit' , function(e){
    document.querySelectorAll('.validationtext').forEach(span => span.textContent="")
    Array.from(form.elements).forEach(mandates => {
        if ([...mandates.classList].includes("mandate")) {
            if (mandates.value === "") {
                e.preventDefault()
                const localSpan = document.createElement('span');
                localSpan.textContent = "This field is required"; 
                localSpan.classList.add("validationtext"); 
                localSpan.style.color = "red"; 
                mandates.parentElement.appendChild(localSpan); 
            }
        }
    });
})
document.addEventListener('DOMContentLoaded', function() {
let problemTitle = document.querySelector('[name="problemtitle"]')
if(problemTitle){
    let spanElement = problemTitle.nextElementSibling;
    spanElement.style.width = "100%";
}
try{

    const extension = document.querySelector('#excelfilediv  a').href.split('.').pop()
    if(extension == "xlsx" || extension == "xls"){
        const excelfilediv = document.querySelector('#excelfilediv').style.display = 'block'
    }else if(extension == "jpg" || extension == "jpeg" || extension == "png"){
        const imagefilediv = document.querySelector('#imagefilediv').style.display = 'block'
    }
}catch(er){
    
}
console.log(`support js with successfully imaplemnts`)

})
