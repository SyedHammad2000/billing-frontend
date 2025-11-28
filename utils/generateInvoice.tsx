// import * as Print from "expo-print";
// import * as Sharing from "expo-sharing";

// const generateInvoice = async (data: {
//   productName: string;
//   price: number;
//   quantity: number;
//   customerName: string;
//   litre: string;
// }) => {
//   // Create HTML for the invoice
//   const html = `
//     <html>
//       <body style="font-family: Arial; padding: 20px;">
//         <h1 style="text-align: center;">Invoice</h1>
//         <hr/>
//         <p><strong>Customer:</strong> ${data.customerName}</p>
//         <p><strong>Product:</strong> ${data.productName}</p>
//         <p><strong>Quantity:</strong> ${data.quantity}</p>
//         <p><strong>Price:</strong> ${data.price}</p>
//         <p><strong>Litre:</strong> ${data.litre}</p>
//         <hr/>
//         <h2>Total: ${data.price * data.quantity}</h2>
//       </body>
//     </html>
//   `;

//   // Generate PDF file
//   const { uri } = await Print.printToFileAsync({
//     html,
//     // optional: set margins, orientation, etc.
//   });

//   // Optionally share PDF
//   await Sharing.shareAsync(uri);
// };

// export default generateInvoice;

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const generateInvoice = async (data: {
  price1: number;
  quantity1: number;
  customerName: string;
  litre1: string;
  logoUri?: string; // optional logo
}) => {
  const items = [
    { litre: data.litre1, quantity: data.quantity1, price: data.price1 },
  ];

  const rowsHtml = items
    .map(
      (item, index) => `
       <div style="display:flex; padding:1px 0;">
       <div style="flex:2;">${index + 1}</div>
         <div style="flex:2;">${item.litre}</div>
         <div style="flex:1; text-align:center;">${item.quantity}</div>
         <div style="flex:2; text-align:right;">${item.price}</div>
         <div style="flex:2; text-align:right;">${item.price * item.quantity}</div>
       </div>`
    )
    .join("");

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const html = `
 <html>
   <body style="font-family: monospace; font-size: 11px; width: 384px;  color: #000; padding: 2px;">
     <div style="text-align:center; margin-bottom:2px;">
       ${data.logoUri ? `<img src="${data.logoUri}" style="width:50px; height:auto; margin-bottom:2px;" />` : ""}
       <div style="font-size:13px; margin-top:2px; font-weight:bold;">MAKE YOUR OWN BOTTLE</div>
       <hr style="border-top:1px dashed #000; margin:2px 0;" />
     </div>
 
     <div>Customer: ${data.customerName}</div>
     <div>Date: ${new Date().toLocaleDateString()}</div>
 
     <div style="display:flex; font-weight:bold; border-bottom:1px dashed #000; padding-bottom:2px;">
       <div style="flex:2;">Item</div>
       <div style="flex:2;">Litre</div>
       <div style="flex:1; text-align:center;">Qty</div>
       <div style="flex:2; text-align:right;">Price</div>
       <div style="flex:2; text-align:right;">Sub</div>
     </div>
 
     ${rowsHtml}
 
     <div style="display:flex; border-top:1px dashed #000; margin-top:4px; font-weight:bold;">
       <div style="flex:7; text-align:right;">TOTAL</div>
       <div style="flex:2; text-align:right;">${total}</div>
     </div>
 
     <div style="text-align:center; margin-top:4px;">Thank you for your purchase!</div>
   </body>
 </html>`;

  const { uri: pdfUri } = await Print.printToFileAsync({
    html,
    width: 384, // no height|,
    base64: false,
    height: 310,
  });

  await Sharing.shareAsync(pdfUri);
  return pdfUri;
};

export default generateInvoice;
