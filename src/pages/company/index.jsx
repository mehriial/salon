"use client"

import { useState } from "react"
import { useForm, Controller, FormProvider } from "react-hook-form"
import { DataTable } from "@/components/app/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerClose,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import PhoneInput from "@/components/app/phone-number"
import * as z from "zod"
import { useTranslation } from "@/context/TranslationContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { Globe, Instagram, Facebook, Youtube, Linkedin } from "lucide-react"

const columns = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone Number",
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => console.log("Open", row.original)}>
                        Open
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Edit", row.original)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => console.log("Delete", row.original)}
                        className="text-red-600 hover:!bg-red-600 hover:!text-white"
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]

export default function CompanyPage() {
    const [filtering, setFiltering] = useState("")
    const [data, setData] = useState(users)

    const formSchema = z.object({
        name: z.string().min(1),
        phone: z.string(),
        instagram: z.string(),
        youtube: z.string(),
        facebook: z.string(),
        linkedin: z.string(),
        website: z.string(),
        phone: z.string(),
        email: z.string().email(),
        category: z.string(),
        description: z.string(),
        profileImage: z.string().optional(),
    })

    const { translate } = useTranslation()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            instagram: "",
            youtube: "",
            linkedin: "",
            website: "",
            facebook: "",
            email: "",
            category: "",
            description: "",
        }
    })


    const onSubmit = (formData) => {
        setData((prev) => [
            ...prev,
            { id: prev.length + 1, status: "Active", ...formData },
        ])
        form.reset()
    }

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <Input
                    placeholder="Search..."
                    value={filtering}
                    onChange={(e) => setFiltering(e.target.value)}
                    className="max-w-sm"
                />
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button>Add</Button>
                    </DrawerTrigger>
                    <DrawerContent className="fixed !left-0 top-0 h-screen w-full max-w-xl m-0 rounded-none border-l bg-white shadow-none ml-auto">
                        <DrawerHeader>
                            <DrawerTitle>New Company</DrawerTitle>
                        </DrawerHeader>
                        <FormProvider {...form}>
                            <form
                                className="grid gap-4 px-4 py-2 overflow-y-auto"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        {...form.register("name", { required: true })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        {...form.register("email", { required: true })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <PhoneInput form={form} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Controller
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Admin">Admin</SelectItem>
                                                    <SelectItem value="Editor">Editor</SelectItem>
                                                    <SelectItem value="Moderator">Moderator</SelectItem>
                                                    <SelectItem value="User">User</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        {...form.register("description")}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="website">Website</Label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="website"
                                            {...form.register("website", { required: true })}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Instagram */}
                                <div className="grid gap-2">
                                    <Label htmlFor="instagram">Instagram</Label>
                                    <div className="relative">
                                        <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="instagram"
                                            {...form.register("instagram", { required: true })}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Facebook */}
                                <div className="grid gap-2">
                                    <Label htmlFor="facebook">Facebook</Label>
                                    <div className="relative">
                                        <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="facebook"
                                            {...form.register("facebook", { required: true })}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Youtube */}
                                <div className="grid gap-2">
                                    <Label htmlFor="youtube">Youtube</Label>
                                    <div className="relative">
                                        <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="youtube"
                                            {...form.register("youtube", { required: true })}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Linkedin */}
                                <div className="grid gap-2">
                                    <Label htmlFor="linkedin">Linkedin</Label>
                                    <div className="relative">
                                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="linkedin"
                                            {...form.register("linkedin", { required: true })}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </form>
                            <DrawerFooter className="mt-4 flex gap-2 items-center flex-row">
                                <DrawerClose asChild>
                                    <Button type="submit">Save</Button>
                                </DrawerClose>
                                <DrawerClose asChild>
                                    <Button variant='outline'>Create & create another</Button>
                                </DrawerClose>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </FormProvider>
                    </DrawerContent>
                </Drawer>
            </div>

            <DataTable
                columns={columns}
                data={data}
                filtering={filtering}
                setFiltering={setFiltering}
            />
        </>
    )
}

const users = [
    {
        id: 1,
        name: "Ali Həsənov",
        email: "ali@example.com",
        phone: "+994501112233",
        status: "Active",
        category: "Admin",
    },
    {
        id: 2,
        name: "Leyla Məmmədova",
        email: "leyla@example.com",
        phone: "+994552223344",
        status: "Pending",
        category: "Editor",
    },
    {
        id: 3,
        name: "Samir Rzayev",
        email: "samir@example.com",
        phone: "+994702334455",
        status: "Banned",
        category: "User",
    },
    {
        id: 4,
        name: "Günel Abbasova",
        email: "gunel@example.com",
        phone: "+994509998877",
        status: "Active",
        category: "Moderator",
    },
]
