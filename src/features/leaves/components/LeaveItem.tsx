import Badge from '~/features/ui/components/Badge';
import { type LeaveItem } from '../types';
import { toDateString } from '~/features/shared/helpers/date';
import { PenSquareIcon } from 'lucide-react';
import Link from 'next/link';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";


export type LeaveItemProps = LeaveItem;

const statusColor = (status: LeaveItem['status']) => {
  switch (status) {
    case 'PENDING':
      return 'info';
    case 'APPROVED':
      return 'success';
    case 'REJECTED':
      return 'danger';
  }
};

const LeaveItem = ({ reason, status, startLeaveDate,endLeaveDate, id }: LeaveItemProps) => {
  return (
    <div>
      <Badge color={statusColor(status)}>{status}</Badge>
      <p>{reason}</p>
      <div>{toDateString(startLeaveDate)}</div>
      <Link href={`/leaves/${id}/edit`}>
        <PenSquareIcon className="h-6 w-6"></PenSquareIcon>
      </Link>
    </div>
  );
};

export default LeaveItem;
