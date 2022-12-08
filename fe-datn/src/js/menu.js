const getMenu = document.querySelector(".navbar");
const getMenuIcons = document.querySelector(".menu");
getMenuIcons.addEventListener("click", function(){
    getMenu.classList.toggle("tokenMenu")

})


$(document).ready(function() {
    document.getElementById('pro-image').addEventListener('change', readImage, false);
    
    $( ".preview-images-zone" ).sortable();
    
    $(document).on('click', '.image-cancel', function() {
        let no = $(this).data('no');
        $(".preview-image.preview-show-"+no).remove();
    });
});