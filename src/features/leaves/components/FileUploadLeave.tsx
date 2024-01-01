import { useState, type ChangeEventHandler, useRef, useEffect } from 'react';
import { ACCEPTED_FILE_TYPES } from '../../ui/helpers/validators';
import { Button } from '@nextui-org/react';
import { set } from 'lodash';
import { ArrowUp,XCircleIcon } from 'lucide-react';

export interface AvatarUploaderProps {
  error?: string | undefined;
  onFileUpload?: (filenames: string[]) => void;
}

export default function FileUploadLeave({ error,onFileUpload }: AvatarUploaderProps) {

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [renamedFilesMap, setRenamedFilesMap] = useState<Map<string, string>>(new Map());

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('file', image);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = (await res.json()) as { filename: string };

    setRenamedFilesMap(prev => new Map(prev).set(image.name, data.filename));

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

    const updatedFiles = [...selectedFiles];
    files.forEach(newFile => {
      if (!updatedFiles.some(file => file.name === newFile.name)) {
        updatedFiles.push(newFile);
      }
    });

    setSelectedFiles(updatedFiles);

    const uploadedFilenames: string[] = [];
    for (const file of files) {
      const filename = await uploadImage(file);
      uploadedFilenames.push(filename);
      console.log('filename', filename);
    }

    if (onFileUpload) {
      onFileUpload(uploadedFilenames);
    }

    // if (!image) return;

    // const filename = await uploadImage(image);
    // setUploadedFiles(filename);

  };

  const handleDeleteFile = (fileName:string) => {
    const newSelectedFiles = selectedFiles.filter(file => file.name !== fileName);
    setSelectedFiles(newSelectedFiles);

    if (onFileUpload) {
      // Map the current selected files to their renamed versions using the renamedFilesMap
      const updatedFilenames = newSelectedFiles.map(file => renamedFilesMap.get(file.name) || file.name);
      onFileUpload(updatedFilenames);
    }

    // setSelectedFiles(selectedFiles.filter(file => file.name !== fileName));
    // if (onFileUpload) {
    //   onFileUpload(selectedFiles.filter(file => file.name !== fileName).map(file => file.name));
    // }
  };

  return (
    <div className="">
      {selectedFiles.map((file, index) => (
      <div className="mb-5 rounded-md bg-[#E5EDFE] py-4 px-8" key={index}>
          <div className="flex items-center justify-between">
            <span className="truncate pr-3 text-base font-medium text-[#07074D]">
            {file.name}
            </span>
            <button onClick={() => handleDeleteFile(file.name)}><XCircleIcon className="w-5 h-" /></button>
          </div>
        </div>
         ))}

    
        <label className="mt-6 cursor-pointer">
          <Button
            className="btn-orange-transparent"
            variant="bordered"
            startContent={<ArrowUp className="h-5 w-5" />}
            onPress={handleButtonUploadClick}
          >
            เลือกไฟล์
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
      <div className="mt-2 text-sm text-red-500">{error}</div>
    </div>
  );
}
