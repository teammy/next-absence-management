import React,{useState} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody,CardFooter, Image,useDisclosure} from "@nextui-org/react";
import Layout from '~/features/ui/components/layouts/Normal';
import { type NextPageWithLayout } from '../_app';
import { Sarabun } from 'next/font/google';
import localFont from 'next/font/local'
import clsx from 'clsx';
const SarabunFont = Sarabun({ subsets: ['thai'],weight: "400"})
const mlpFont = localFont({ src: '../../../public/fonts/maledpan.woff2' })
import { useRouter } from 'next/router';

type Props = {}


const SelectTypePage: NextPageWithLayout = () => {
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('opaque');
  const handleOpen = (backdrop:any) => {
    setBackdrop(backdrop)
    onOpen();
  }

  const list = [
    {
      title: "ลากิจ",
      img: "/images/private.png",
      price: "$5.50",
      slug: "create/private",
    },
    {
      title: "ลาป่วย",
      img: "/images/sick.png",
      price: "vacation",
      slug:"create/sick",
    },
    {
      title: "ลาพักผ่อน",
      img: "/images/vacation.png",
      price: "$10.00",
      slug:"create/vacation",
    },
    {
      title: "ลาคลอดบุตร",
      img: "/images/stroller.png",
      price: "$10.00",
      slug:"vacation",
    },
  ];
  
  return (
    <>
       <div className="gap-3 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => router.push(`${item.slug}`)}>
          <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="none"
          src={item.img}
          width={40}
        />
        <div className="flex flex-col ml-3">
          <p className="text-lg font-semibold text-[#002d63]">{item.title}</p>
        </div>

      </CardHeader>
        </Card>
      ))}
      <Card shadow="sm" isPressable onPress={() => handleOpen(backdrop)}>
          <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="none"
          src="/images/other.png"
          width={40}
        />
        <div className="flex flex-col ml-3">
          <p className="text-lg font-semibold">ลาประเภทอื่น</p>
        </div>

      </CardHeader>
        </Card>
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className={clsx(mlpFont.className)}>
          {(onClose) => (
            <>
              <ModalHeader className={clsx(mlpFont.className,"flex flex-col gap-1")}>การลาประเภทอื่น</ModalHeader>
              <ModalBody className={SarabunFont.className}>
                <p> 
                การลาประเภทอื่น เช่น ลาอุปสมบท ลาศึกษาต่อ ท่านสามารถดำเนินการติดต่องานทรัพยากรบุคคลเพื่อขออนุมัติการลาได้
                </p>
                <p>
                  โทร. 1242 (เบอร์ภายใน)
                </p>
                
              </ModalBody>
     
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
    </>
  )
}

SelectTypePage.getLayout = Layout;

export default SelectTypePage