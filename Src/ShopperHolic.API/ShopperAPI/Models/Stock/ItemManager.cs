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
            var uploadPath = Path.Combine(env.ContentRootPath + "\\wwwroot\\", "uploads");
            if (file.Length > 0)
            {
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }
                var extension = Path.GetExtension(file.FileName);
                var currentPath = Path.Combine(uploadPath, id + extension);
                var resizedPath = Path.Combine(uploadPath, id + "resized" + extension);
                using (var filestream = new FileStream(currentPath, FileMode.OpenOrCreate))
                {
                    file.CopyTo(filestream);
                }

                int maxWidth = 1025;
                const long quality = 100L;
                Bitmap sourceBitmap = new Bitmap(currentPath);

                double originalWidth = sourceBitmap.Width;
                double originalHeight = sourceBitmap.Height;
                double aspectRatio = originalHeight / originalWidth;
                int newHeight = (int)(maxWidth * aspectRatio);

                
                var newDrawArea = new Bitmap(maxWidth, newHeight);

                using (var graphicDrawArea = Graphics.FromImage(newDrawArea))
                {
                    
                    graphicDrawArea.CompositingQuality = CompositingQuality.HighSpeed;
                    graphicDrawArea.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    graphicDrawArea.CompositingMode = CompositingMode.SourceCopy;

                    graphicDrawArea.DrawImage(sourceBitmap, 0, 0, maxWidth, newHeight);

                    using (var output = File.Open(resizedPath, FileMode.Create))
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
                            else if(codec.FormatID == ImageFormat.Png.Guid && (extension.Contains("png")))
                            {
                                newDrawArea.Save(output, codec, encoderParameters);
                                output.Close();
                                break;
                            }
                        }
                        graphicDrawArea.Dispose();
                    }
                    sourceBitmap.Dispose();
                    _itemService.UpdateImage(id, Path.GetFileName(resizedPath));
                }
                File.Delete(currentPath);
            }
            return true;
        }
    }
}