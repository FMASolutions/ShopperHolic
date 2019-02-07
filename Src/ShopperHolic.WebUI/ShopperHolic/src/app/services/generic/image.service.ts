import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  /**
     * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
     * @param {Image} source_img_obj The source Image Object
     * @param {Integer} quality The output quality of Image Object
     * @param {String} output format. Possible values are jpg and png
     * @return {Image} result_image_obj The compressed Image Object
     */
  public compress(source_img_obj, quality, output_format) {

    var mime_type = "image/jpeg";
    if (typeof output_format !== "undefined" && output_format == "png") {
      mime_type = "image/png";
    }


    var cvs = document.createElement('canvas');
    cvs.width = source_img_obj.naturalWidth;
    cvs.height = source_img_obj.naturalHeight;
    var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
    var newImageData = cvs.toDataURL(mime_type, quality / 100);
    var result_image_obj = new Image();
    result_image_obj.src = newImageData;
    return result_image_obj;
  }

}
