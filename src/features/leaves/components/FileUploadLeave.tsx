import { useState, type ChangeEventHandler, useRef, useEffect } from 'react';
import { ACCEPTED_FILE_TYPES } from '../../ui/helpers/validators';
import { Image, Button } from '@nextui-org/react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { set } from 'lodash';

export interface AvatarUploaderProps {
  error?: string | undefined;
}

export default function FileUploadLeave({ error }: AvatarUploaderProps) {

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('file', image);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = (await res.json()) as { filename: string };

    return data.filename;
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const files = Array.from(event.target.files || []);
    const image = event.target.files?.[0];
    if (!files) return;
   
    setSelectedFiles(files);
    console.log('files', files);


    for (const file of files) {
      const filename = await uploadImage(file);
      console.log('filename', filename);
    }

    // if (!image) return;

    setIsButtonDisabled(true);
    // const filename = await uploadImage(image);
    // setUploadedFiles(filename);

  };

  return (
    <div className="mx-auto w-48 rounded-lg bg-white px-4 py-5 text-center shadow-lg">
      <div className="mb-4">
        {/* <Image
          src="/assets/images/avatar.png"
          alt="Avatar Upload"
          width={100}
          height={100}
          onLoad={() => setIsButtonDisabled(false)}
          className="mx-auto w-auto rounded-full object-cover object-center"
        ></Image> */}
      </div>
      {isButtonDisabled ? (
        <div><ul>
        {selectedFiles.map((file, index) => (
          <li key={index}>{file.name}</li> // Displaying the file name
        ))}
      </ul></div>
      ) : (
        <label className="mt-6 cursor-pointer">
          <Button
            className="btn-orange-transparent"
            variant="bordered"
            startContent={<ArrowUpTrayIcon className="h-5 w-5" />}
            onPress={handleButtonUploadClick}
          >
            อัพโหลดเอกสาร
          </Button>
          <input
          ref={fileInputRef}
            type="file"
            accept={ACCEPTED_FILE_TYPES.join(', ')}
            className="hidden"
            multiple
            onChange={handleFileSelect}
          ></input>
        </label>
      )}

      <div className="mt-2 text-sm text-red-500">{error}</div>
    </div>
  );
}
