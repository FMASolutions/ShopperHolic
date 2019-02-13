using System.Collections.Generic;
using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class RMADetailedDTO
    {
        public RMADetailedDTO()
        {
            Header = new RMADTO();
        }

        public RMADTO Header { get; set; }
        public IEnumerable<RMAItemDTO> Items { get; set; }
        public IEnumerable<ReturnNotePreviewDTO> ReturnNotes { get; set; }
        public IEnumerable<CreditNotePreviewDTO> CreditNotes { get; set; }
    }
}