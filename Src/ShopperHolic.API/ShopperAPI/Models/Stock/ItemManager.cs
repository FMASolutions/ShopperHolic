using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class ItemManager : IDisposable
    {
        public ItemManager(IItemService service)
        {
            _itemService = service;
        }

        public void Dispose()
        {
            _itemService.Dispose();
        }

        private IItemService _itemService;

        public ItemDTO Create(ItemCreateDTO modelToCreate)
        {
            return _itemService.Create(modelToCreate);
        }
        public ItemDTO GetByID(int id)
        {
            return _itemService.GetByID(id);
        }

        public List<ItemPreviewDTO> GetAllPreview()
        {
            var returnList = new List<ItemPreviewDTO>();
            foreach (var current in _itemService.GetAllPreview())
                returnList.Add(current);
            return returnList;
        }

        public ItemDTO Update(ItemDTO newModel)
        {
            return _itemService.Update(newModel);
        }

        public bool Delete(int id)
        {
            return _itemService.Delete(id);
        }

        public bool StoreAndUpdateItemImage(IFormFile file, int id, IHostingEnvironment env)
        {
            if (file.Length > 0)
            {
                var uploadPath = Path.Combine(env.ContentRootPath + "\\wwwroot\\", "uploads");
                CreateDirectory(uploadPath); //Create folder incase it doesn't exist.
                var extension = Path.GetExtension(file.FileName);
                var filenameWithPath = Path.Combine(uploadPath, id + extension);
                int maxWidth = 1025;
                const long quality = 50L;

                Bitmap sourceBitmap = new Bitmap(file.OpenReadStream());
                if (sourceBitmap.Width > maxWidth)
                {
                    double originalWidth = sourceBitmap.Width;
                    double originalHeight = sourceBitmap.Height;
                    double aspectRatio = originalHeight / originalWidth;
                    int newHeight = (int)(maxWidth * aspectRatio);
                    compressAndstoreImage(sourceBitmap, filenameWithPath, maxWidth, newHeight, quality);
                }
                else
                    compressAndstoreImage(sourceBitmap, filenameWithPath, sourceBitmap.Width, sourceBitmap.Height, quality);

                _itemService.UpdateImage(id, Path.GetFileName(filenameWithPath));
            }
            else
                return false;
            return true;
        }

        private void CreateDirectory(string path)
        {
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
        }

        private void compressAndstoreImage(Bitmap sourceBitmap, string filenameWithPath, int maxWidth, int newHeight, long quality)
        {
            var extension = Path.GetExtension(filenameWithPath);

            var newDrawArea = new Bitmap(maxWidth, newHeight);

            using (var graphicDrawArea = Graphics.FromImage(newDrawArea))
            {
                graphicDrawArea.CompositingQuality = CompositingQuality.HighSpeed;
                graphicDrawArea.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphicDrawArea.CompositingMode = CompositingMode.SourceCopy;

                graphicDrawArea.DrawImage(sourceBitmap, 0, 0, maxWidth, newHeight);

                using (var output = File.Open(filenameWithPath, FileMode.Create))
                {
                    var qualityParamID = Encoder.Quality;
                    var encoderParameters = new EncoderParameters(1);
                    encoderParameters.Param[0] = new EncoderParameter(qualityParamID, quality);

                    var codecs = ImageCodecInfo.GetImageDecoders();
                    foreach (var codec in codecs)
                    {

                        if (codec.FormatID == ImageFormat.Jpeg.Guid && (extension.Contains("jpg") || extension.Contains("jpeg")))
                        {
                            newDrawArea.Save(output, codec, encoderParameters);
                            output.Close();
                            break;
                        }
                        else if (codec.FormatID == ImageFormat.Png.Guid && (extension.Contains("png")))
                        {
                            newDrawArea.Save(output, codec, encoderParameters);
                            output.Close();
                            break;
                        }
                    }
                    graphicDrawArea.Dispose();
                }
                sourceBitmap.Dispose();
            }
        }
    }
}