import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";



const AdminOrdersView = () => {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const { orderList, orderDetails } = useAppSelector((state) => state.adminOrder);
    const dispatch = useAppDispatch();

    function handleFetchOrderDetails(getId: any) {
        dispatch(getOrderDetailsForAdmin(getId));
    }

    useEffect(() => {
        dispatch(getAllOrdersForAdmin());
    }, [dispatch]);

    useEffect(() => {
        if (orderDetails !== null) {
            setOpenDetailsDialog(true)
        }
    }, [orderDetails])

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList && orderList.length > 0
                            ? orderList.map((orderItem: any) => (
                                <TableRow>
                                    <TableCell>{orderItem?.id}</TableCell>
                                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`py-1 px-3 ${orderItem?.orderStatus === "confirmed"
                                                    ? "bg-green-500"
                                                    : orderItem?.orderStatus === "rejected"
                                                        ? "bg-red-600"
                                                        : "bg-black"
                                                }`}
                                        >
                                            {orderItem?.orderStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${orderItem?.totalAmount}</TableCell>
                                    <TableCell>
                                        <Dialog
                                            open={openDetailsDialog}
                                            onOpenChange={() => {
                                                setOpenDetailsDialog(false);
                                                dispatch(resetOrderDetails());
                                            }}
                                        >
                                            <Button
                                                onClick={() =>
                                                    handleFetchOrderDetails(orderItem?.id)
                                                }
                                            >
                                                View Details
                                            </Button>
                                            <AdminOrderDetailsView orderDetails={orderDetails} />
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))
                            : null}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default AdminOrdersView