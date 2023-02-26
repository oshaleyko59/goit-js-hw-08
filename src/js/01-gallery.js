// eslint-disable-next-line no-unused-vars
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

//find gallery element
const galleryContainer = document.querySelector(".gallery");

//render gallery content
galleryContainer.insertAdjacentHTML(
	"beforeend",
	createGalleryMarkup(galleryItems)
);

//initialize SimpleLightBox with options for source of caption and caption delay ms

//functions below can be moved to external module
//and createGalleryMarkup can be exported from there
//** creates markup for gallery content from galleryItems array
function createGalleryMarkup(galleryItems) {
  return galleryItems.map(createGalleryItem).join('');
}

//** creates markup for a gallery item from given template
function createGalleryItem(element) {
  return `<a class="gallery__item" href="${element.original}">
						<img
							class="gallery__image"
							src="${element.preview}"
							alt="${element.description}"
						/>
					</a>`;
}

