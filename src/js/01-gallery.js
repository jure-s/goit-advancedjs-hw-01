import { galleryItems } from "./gallery-items.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const galleryContainer = document.querySelector(".gallery");

function createGalleryMarkup({ preview, original, description }) {
  return `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
    </li>
  `;
}

function initGallery() {
  const galleryMarkup = galleryItems.map(createGalleryMarkup).join("");
  galleryContainer.insertAdjacentHTML("afterbegin", galleryMarkup);

  const lightbox = new SimpleLightbox(".gallery a", {
    captions: true,
    captionsData: "alt",
    captionDelay: 250,
    showCounter: false,
  });

  lightbox.on("show.simplelightbox", function (e) {
    document.body.style.overflow = "hidden";
  });

  lightbox.on("close.simplelightbox", function (e) {
    document.body.style.overflow = "";
  });
}

initGallery();