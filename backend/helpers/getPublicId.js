exports.getPublicId = (imageUrls) => {
  const public_ids = [];
  for (const imageUrl of imageUrls) {
    const extractURL = imageUrl.match(/upload\/(?:v\d+\/)?([^\.]+)/);
    const public_id = extractURL[1];
    public_ids.push(public_id);
  }
  return public_ids;
};
