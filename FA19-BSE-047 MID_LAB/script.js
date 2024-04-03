<script>
function handleMouseHover(event) {
    const imageName = event.target.alt; 
    const menuText = document.getElementById("menuText");
    menuText.textContent = imageName; 
}

const image = document.getElementById("hoverImage");
image.addEventListener("mouseover", handleMouseHover);
function changeImageSource(imageSrc) {
    image.src = imageSrc
}
<button onclick="changeImageSource('earthquake.jpg')">Get Image Text</button>

</script>