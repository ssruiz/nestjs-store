const VALID_ENTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (_any: any, _boolean: boolean) => void,
) => {
  if (!file) return cb(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];

  if (VALID_ENTENSIONS.includes(fileExtension)) return cb(null, true);

  return cb(null, false);
};
