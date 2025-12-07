// import * as Print from "expo-print";
// import * as Sharing from "expo-sharing";

// const generateInvoice2 = async (data: {
//   customerName: string;
//   price1: number;
//   price2: number;
//   quantity1: number;
//   quantity2: number;
//   litre1: string;
//   litre2: string;
//   logoUri?: string; // optional logo
// }) => {
//   // Calculate dynamic height
//   const numRows = 2; // adjust if more rows in future
//   const rowHeight = 18; // px per row
//   const headerHeight = 80; // logo + title
//   const footerHeight = 50; // footer
//   const contentHeight = headerHeight + numRows * rowHeight + footerHeight;

//   // Build HTML
//   const html = `
// <html>
//   <body style="font-family: monospace; font-size: 11px; width: 384px; color: #000; padding: 2px;">

//     <!-- Logo & Header -->
//     <div style="text-align: center; margin-bottom: 2px;">
//       ${data.logoUri ? `<img src="${data.logoUri}" style="width: 50px; height: auto; margin-bottom: 2px;" />` : ""}
//       <div style="font-size: 13px; font-weight: bold; margin: 2px 0;">MAKE YOUR OWN BOTTLE</div>
//       <hr style="border-top: 1px dashed #000; margin: 2px 0;"/>
//     </div>

//     <!-- Customer Info -->
//     <div style="margin-bottom: 2px;">
//       <div>Customer: ${data.customerName}</div>
//       <div>Date: ${new Date().toLocaleDateString()}</div>
//     </div>

//     <!-- Table Header -->
//     <div style="display: flex; font-weight: bold; border-bottom: 1px dashed #000; padding-bottom: 2px;">
//       <div style="flex:2;">Litre</div>
//       <div style="flex:1; text-align:center;">Qty</div>
//       <div style="flex:2; text-align:right;">Price</div>
//       <div style="flex:2; text-align:right;">Sub</div>
//     </div>

//     <!-- Table Rows -->
//     <div style="display: flex; padding: 1px 0;">
//       <div style="flex:2;">${data.litre1}</div>
//       <div style="flex:1; text-align:center;">${data.quantity1}</div>
//       <div style="flex:2; text-align:right;">${data.price1}</div>
//       <div style="flex:2; text-align:right;">${data.price1 * data.quantity1}</div>
//     </div>
//     <div style="display: flex; padding: 1px 0;">
//       <div style="flex:2;">${data.litre2}</div>
//       <div style="flex:1; text-align:center;">${data.quantity2}</div>
//       <div style="flex:2; text-align:right;">${data.price2}</div>
//       <div style="flex:2; text-align:right;">${data.price2 * data.quantity2}</div>
//     </div>

//     <!-- Total -->
//     <div style="display: flex; border-top: 1px dashed #000; padding-top: 2px; font-weight: bold;">
//       <div style="flex:5; text-align:right;">TOTAL</div>
//       <div style="flex:2; text-align:right;">${data.price1 * data.quantity1 + data.price2 * data.quantity2}</div>
//     </div>

//     <!-- Footer -->
//     <div style="text-align: center; margin-top: 2px; border-top: 1px dashed #000; padding-top: 2px;">
//       Thank you for your purchase!
//     </div>

//   </body>
// </html>
// `;

//   const { uri } = await Print.printToFileAsync({
//     html,
//     width: 384,
//     height: contentHeight,
//     base64: false,
//   });

//   await Sharing.shareAsync(uri);

//   return uri;
// };

// export default generateInvoice2;
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const generateInvoice2 = async (data: any) => {
  const items = [
    { id: 1, litre: data.litre1, quantity: data.quantity1, price: data.price1 },
    { id: 2, litre: data?.litre2, quantity: data?.quantity2, price: data?.price2 },
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
  <body style="font-family: monospace; font-size: 11px; width: 450px;  color: #000; padding: 2px;">
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
    height: 390,
  });

  await Sharing.shareAsync(pdfUri);
  return pdfUri;
};

export default generateInvoice2;
