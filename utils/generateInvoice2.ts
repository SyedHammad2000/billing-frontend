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

const generateInvoice2 = async (data: {
  customerName: string;
  price1: number;
  price2: number;
  quantity1: number;
  quantity2: number;
  litre1: string;
  litre2: string;
  logoUri?: string; // optional logo
}) => {
  let logoTag = "";

  if (data.logoUri) {
    // For remote images, just use the URL
    // For local images, you can use Image.resolveAssetSource(require(...)).uri
    logoTag = `<div style="text-align: center; margin-bottom: 20px;">
                 <img src="${data.logoUri}" style="width: 150px; height: auto;" />
               </div>`;
  }

  // Create HTML for the invoice
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          ${data.logoUri ? `<img src="${data?.logoUri}" style="width: 120px; height: auto;" />` : ""}
          <h1 style="margin: 0;">Make Your Own Bottle</h1>
          <hr style="margin-top: 10px;"/>
        </div>

        <div style="margin-bottom: 20px;">
          <p><strong>Customer:</strong> ${data.customerName}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid #ddd; padding: 8px;">Litre</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
              <th style="border: 1px solid #ddd; padding: 8px;">SubTotal</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${data.litre1}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${data.quantity1}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${data.price1}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${data.price1 * data.quantity1}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${data.price1 * data.quantity1}</td>

          
            </tr>
            <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${data.litre2}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${data.quantity2}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${data.price2}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${data.price2 * data.quantity2}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${data.price2 * data.quantity2}</td>
            </tr>
            <tr>
            <td style=" padding: 8px;"></td>
            <td style=" padding: 8px;"></td>
            <td style=" padding: 8px;"></td>
            <td style=" padding: 8px;"></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${data.price1 * data.quantity1 + data.price2 * data.quantity2}</td>
            </tr>
          </tbody>
        </table>
        <div style="text-align: center; border-top: 1px solid #ddd; padding-top: 10px;">
          <p>Thank you for your purchase!</p>
        </div>
      </body>
    </html>
  `;
  // Generate PDF file
  const { uri } = await Print.printToFileAsync({
    html,
    // optional: set margins, orientation, etc.
  });

  // Optionally share PDF
  await Sharing.shareAsync(uri);

  return uri;
};

export default generateInvoice2;
