const { createInvoice } = require("./createInvoice.js");

// This was just a file for testing invoice generation
const invoice = {
  ponumber: "1234",
  date: "2022-11-18",
  billfrom: "Hunter",
  billto: "Creighton",
  service:
    "Lawn services provided. Mowing, Weeding Eating, edging, and hedge trimming.",
  charges: "100",
  taxrate: "0.045",
  totalcharge: "104.50",
  notes:
    "A bunch of notes and stuff will go in herefasdjhafljkadshjkfhasdjkafhsdafojhasdjklfasdfkjhgasjdfasdfgasdfasdjkgfhjkhasd asdfjkhakjlsdfkjhagsjkdfhakjsdfasdfklajshfjknasdkfj.dsflkjhasdjkfhkjlasdhfjkassdf,mbasdjkfbjkasdnfkjlasbdfjknasdkjfb kasdncbk sdfkslfjakjhds vlksadjfnljhcasdnmvocikhawdnkfjvnasfdkjfbncalkdshcnjasndmxcvjkn basdkljlfzxmcn alsjdhhfxjmcaksdjzxmhfdcnl jasdmzhjfdm;kjaewjsdfmkjcsdfhxzjfm;cjkamedbsnxfz ,jhcn",
};

createInvoice(invoice, "invoice.pdf");
