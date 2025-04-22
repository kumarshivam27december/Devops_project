const renderImage = (buffer, type) => {

  const binary = Buffer.from(buffer).toString('base64'); 
  const base64Flag = `data:${type};base64,`; 
  return base64Flag + binary

}

const bookImagePlaceholder = "https://mweb-cdn.karousell.com/build/select-photo-a2ee9a0f15cf6a64ff3119c599e31a8d.svg";

const userImagePlaceholder = "https://media.karousell.com/media/photos/profiles/default.png"


export {renderImage, bookImagePlaceholder, userImagePlaceholder};
