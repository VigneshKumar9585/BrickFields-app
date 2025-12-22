import React, { useEffect, useState } from "react";
import {
    Box,
    CardContent,
    Grid,
    Typography,
    Divider,
    Avatar
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../componts/LspNavbar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DetailsCard = ({ title, data, headerColor = "#029898", image }) => {
    if (!data) return null;


    return (
        <CardContent
            sx={{
                border: "1px solid #d0d0d0",
                borderRadius: "10px",
                p: 0,
                bgcolor: "#fff",
                overflow: "hidden",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                fontSize: "13px",
                // height: "100%",
                minHeight: "250px",
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* HEADER */}
            <Box
                sx={{
                    px: 2,
                    py: 1,
                    bgcolor: headerColor,
                    color: "#fff",
                }}
            >
                <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    {title}
                </Typography>
            </Box>

            {/* DETAILS */}
            <Box sx={{ px: 2, pt: 2, flex: 1 }}>
                {image && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Avatar
                            src={image}
                            sx={{
                                width: 80,
                                height: 80,
                                border: `2px solid ${headerColor}`,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                        />
                    </Box>
                )}
                {data.map((item, index) => (
                    <Box key={index}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "13px",
                                    width: "120px",
                                    color: "#555"
                                }}
                            >
                                {item.label}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    color: "#333",
                                    flex: 1,
                                    textAlign: "right"
                                }}
                            >
                                {item.value || "-"}
                            </Typography>
                        </Box>
                        {index !== data.length - 1 && (
                            <Divider sx={{ mb: 1.5, borderColor: "#f0f0f0" }} />
                        )}
                    </Box>
                ))}
            </Box>
        </CardContent>
    );
};

function LspEnquiryFullDetails() {
    const { id } = useParams();
    const [enquiry, setEnquiry] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/get-enquiry-id/${id}`);
                console.log(res.data)
                setEnquiry(res.data);
            } catch (error) {
                console.error("Error fetching enquiry details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <Box sx={{ p: 3, ml: { md: "250px" } }}>
                    <Typography>Loading...</Typography>
                </Box>
            </>
        );
    }

    if (!enquiry) {
        return (
            <>
                <Navbar />
                <Box sx={{ p: 3, ml: { md: "250px" } }}>
                    <Typography>Enquiry not found</Typography>
                </Box>
            </>
        );
    }

    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    // Prepare data for cards
    const enquiryDetails = [
        { label: "Enquiry ID", value: enquiry.enquiryId },
        { label: "Name", value: enquiry.name },
        { label: "Phone Number", value: enquiry.phoneNumber },
        { label: "Email", value: enquiry.email },
        { label: "State", value: enquiry.state },
        { label: "District", value: enquiry.district },
        { label: "City", value: enquiry.city },
        { label: "Address", value: `${enquiry.street || ""} ${enquiry.landmark || ""}` },
        { label: "Sq Feet", value: enquiry.sqFeet },
        { label: "Enquiry Date", value: formatDate(enquiry.enquiryDate) },
        { label: "Preferred Date", value: formatDate(enquiry.preferDate) },
        { label: "Preferred Time", value: enquiry.preferTime },
        { label: "Status", value: enquiry.status },
    ];
    console.log(enquiry)
    const managerDetails = enquiry.assignedManager ? [
        { label: "Name", value: enquiry.assignedManager.name },
        { label: "Phone", value: enquiry.assignedManager.phoneNumber || enquiry.assignedManager.mobile },
        { label: "Email", value: enquiry.assignedManager.email },
        { label: "Region", value: enquiry.assignedManager.city },
        { label: "State", value: enquiry.assignedManager?.state },
        { label: "District", value: enquiry.assignedManager?.district },

        // { label: "Role", value: "Manager" },
    ] : null;

    const managerImage = enquiry.assignedManager?.profileImage
        ? `${BACKEND_URL}/upload-manager-images/${enquiry.assignedManager.profileImage}`
        : null;

    const lspDetails = enquiry.assignedLSP ? [
        { label: "Name", value: enquiry.assignedLSP.companyName },
        { label: "Phone", value: enquiry.assignedLSP.companyPhoneNumber || enquiry.assignedLSP.mobile },
        { label: "Email", value: enquiry.assignedLSP.email },
        { label: "Region", value: enquiry.assignedLSP.region },
        { label: "State", value: enquiry.assignedLSP.state },
        { label: "District", value: enquiry.assignedLSP.district },




    ] : null;

    const lspImage = enquiry.assignedLSP?.profileImage
        ? `${BACKEND_URL}/upload-lsp-images/${enquiry.assignedLSP.profileImage}`
        : null;

    // Handling multiple technicians if array or single fields
    // Based on ManageEnquiry, fields are assignedTechnician1, assignedTechnician2
    const tech1 = enquiry.assignedTechnician1 ? [
        { label: "Name", value: enquiry.assignedTechnician1.name },
        { label: "Phone", value: enquiry.assignedTechnician1.phoneNumber || enquiry.assignedTechnician1.mobile },
        { label: "Role", value: "Technician 1" },
    ] : null;

    const tech1Image = enquiry.assignedTechnician1?.profileImage
        ? `${BACKEND_URL}/upload-technician-images/${enquiry.assignedTechnician1.profileImage}`
        : null;

    const tech2 = enquiry.assignedTechnician2 ? [
        { label: "Name", value: enquiry.assignedTechnician2.name },
        { label: "Phone", value: enquiry.assignedTechnician2.phoneNumber || enquiry.assignedTechnician2.mobile },
        { label: "Role", value: "Technician 2" },
    ] : null;

    const tech2Image = enquiry.assignedTechnician2?.profileImage
        ? `${BACKEND_URL}/upload-technician-images/${enquiry.assignedTechnician2.profileImage}`
        : null;

    return (
        <>
            <Navbar />
            <Box sx={{
                p: 3,
                ml: { md: "250px" },
                minHeight: "100vh",
            }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#333" }}>
                    Enquiry Overview
                </Typography>

                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr 1fr 1fr 1fr 1fr 1fr" },
                    gap: 3
                }}>
                    {/* Enquiry Details Card - Left, spans 2 rows */}
                    <Box sx={{ gridColumn: { xs: "1", sm: "1", md: "1 / 3" }, gridRow: "1 / 3" }}>
                        <DetailsCard title="Enquiry Details" data={enquiryDetails} />
                    </Box>

                    {/* Manager Details Card */}
                    <Box sx={{ gridColumn: { xs: "1", sm: "1", md: "3 / 5" }, gridRow: "1" }}>
                        {managerDetails ? (
                            <DetailsCard title="Assigned Manager" data={managerDetails} headerColor="#0C5460" image={managerImage} />
                        ) : (
                            <CardContent
                                sx={{
                                    border: "1px dashed #bdbdbd",
                                    borderRadius: "12px",
                                    height: "100%",
                                    minHeight: "250px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: "#fafafa",
                                    textAlign: "center",
                                    p: 3
                                }}
                            >
                                <Typography variant="h6" sx={{ color: "#757575", fontWeight: 500, mb: 1 }}>
                                    No Manager Assigned
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                                    This enquiry has not been assigned to any Manager yet.
                                </Typography>
                            </CardContent>
                        )}
                    </Box>

                    {/* LSP Details Card */}
                    <Box sx={{ gridColumn: { xs: "1", sm: "1", md: "5 / 7" }, gridRow: "1" }}>
                        {lspDetails ? (
                            <DetailsCard title="Assigned LSP" data={lspDetails} headerColor="#5e35b1" image={lspImage} />
                        ) : (
                            <CardContent
                                sx={{
                                    border: "1px dashed #bdbdbd",
                                    borderRadius: "12px",
                                    height: "100%",
                                    minHeight: "250px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: "#fafafa",
                                    textAlign: "center",
                                    p: 3
                                }}
                            >
                                <Typography variant="h6" sx={{ color: "#757575", fontWeight: 500, mb: 1 }}>
                                    No LSP Assigned
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                                    This enquiry has not been assigned to any Local Service Provider yet.
                                </Typography>
                            </CardContent>
                        )}
                    </Box>

                    {/* Technician 1 Details Card */}
                    <Box sx={{ gridColumn: { xs: "1", sm: "1", md: "3 / 5" }, gridRow: "2" }}>
                        {tech1 ? (
                            <DetailsCard title="Assigned Technician 1" data={tech1} headerColor="#e65100" image={tech1Image} />
                        ) : (
                            <CardContent
                                sx={{
                                    border: "1px dashed #bdbdbd",
                                    borderRadius: "12px",
                                    height: "100%",
                                    minHeight: "250px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: "#fafafa",
                                    textAlign: "center",
                                    p: 3
                                }}
                            >
                                <Typography variant="h6" sx={{ color: "#757575", fontWeight: 500, mb: 1 }}>
                                    No Technician Assigned
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                                    No technicians have been assigned to this enquiry.
                                </Typography>
                            </CardContent>
                        )}
                    </Box>

                    {/* Technician 2 Details Card */}
                    <Box sx={{ gridColumn: { xs: "1", sm: "1", md: "5 / 7" }, gridRow: "2" }}>
                        {tech2 ? (
                            <DetailsCard title="Assigned Technician 2" data={tech2} headerColor="#e65100" image={tech2Image} />
                        ) : (
                            <CardContent
                                sx={{
                                    border: "1px dashed #bdbdbd",
                                    borderRadius: "12px",
                                    height: "100%",
                                    minHeight: "250px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: "#fafafa",
                                    textAlign: "center",
                                    p: 3
                                }}
                            >
                                <Typography variant="h6" sx={{ color: "#757575", fontWeight: 500, mb: 1 }}>
                                    No Technician Assigned
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                                    No technicians have been assigned to this enquiry.
                                </Typography>
                            </CardContent>
                        )}
                    </Box>

                </Box>
            </Box>
        </>
    );
}

export default LspEnquiryFullDetails;
