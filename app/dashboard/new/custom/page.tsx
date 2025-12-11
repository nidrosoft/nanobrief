"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Field from "@/components/Field";
import DatePicker from "@/components/DatePicker";
import {
    ArrowLeft2,
    Setting4,
    Add,
    Trash,
    Edit2,
    TextalignLeft,
    HashtagSquare,
    Calendar,
    DollarSquare,
    Link21,
    Image as ImageIcon,
    DocumentUpload,
    TickSquare,
    ArrowDown2,
    Copy,
    Eye,
    CloseCircle,
    Sms,
    Call,
} from "iconsax-react";

// Field type definitions
const fieldTypes = [
    { id: "text", name: "Short Text", icon: TextalignLeft, color: "#2d68ff", description: "Single line text input" },
    { id: "textarea", name: "Long Text", icon: TextalignLeft, color: "#2d68ff", description: "Multi-line text area" },
    { id: "number", name: "Number", icon: HashtagSquare, color: "#00a656", description: "Numeric values" },
    { id: "price", name: "Price", icon: DollarSquare, color: "#00a656", description: "Currency/money input" },
    { id: "date", name: "Date", icon: Calendar, color: "#f52495", description: "Date picker" },
    { id: "daterange", name: "Date Range", icon: Calendar, color: "#f52495", description: "Start and end dates" },
    { id: "select", name: "Dropdown", icon: ArrowDown2, color: "#a444f3", description: "Single choice from options" },
    { id: "multiselect", name: "Multiple Choice", icon: TickSquare, color: "#a444f3", description: "Select multiple options" },
    { id: "link", name: "Link/URL", icon: Link21, color: "#6366f1", description: "Website or reference link" },
    { id: "email", name: "Email", icon: Sms, color: "#6366f1", description: "Email address" },
    { id: "phone", name: "Phone", icon: Call, color: "#6366f1", description: "Phone number" },
    { id: "file", name: "File Upload", icon: DocumentUpload, color: "#f59e0b", description: "Documents, PDFs" },
    { id: "image", name: "Image Upload", icon: ImageIcon, color: "#f59e0b", description: "Reference images" },
];

interface CustomField {
    id: string;
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
    options?: string[]; // For select/multiselect
}

interface Section {
    id: string;
    title: string;
    fields: CustomField[];
}

export default function CustomBriefBuilderPage() {
    const router = useRouter();
    const [briefName, setBriefName] = useState("");
    const [sections, setSections] = useState<Section[]>([
        { id: "section-1", title: "Section 1", fields: [] }
    ]);
    const [showFieldPicker, setShowFieldPicker] = useState<string | null>(null);
    const [editingField, setEditingField] = useState<{ sectionId: string; fieldId: string } | null>(null);
    const [editingSectionTitle, setEditingSectionTitle] = useState<string | null>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [previewAnswers, setPreviewAnswers] = useState<Record<string, string | string[]>>({});

    // Generate unique ID
    const generateId = () => `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Add a new field to a section
    const addField = (sectionId: string, fieldType: string) => {
        const fieldTypeData = fieldTypes.find(f => f.id === fieldType);
        const newField: CustomField = {
            id: generateId(),
            type: fieldType,
            label: fieldTypeData?.name || "New Field",
            placeholder: `Enter ${fieldTypeData?.name.toLowerCase() || "value"}...`,
            required: false,
            options: fieldType === "select" || fieldType === "multiselect" ? ["Option 1", "Option 2", "Option 3"] : undefined,
        };

        setSections(prev => prev.map(section => 
            section.id === sectionId 
                ? { ...section, fields: [...section.fields, newField] }
                : section
        ));
        setShowFieldPicker(null);
        setEditingField({ sectionId, fieldId: newField.id });
    };

    // Update a field
    const updateField = (sectionId: string, fieldId: string, updates: Partial<CustomField>) => {
        setSections(prev => prev.map(section => 
            section.id === sectionId 
                ? { 
                    ...section, 
                    fields: section.fields.map(field => 
                        field.id === fieldId ? { ...field, ...updates } : field
                    )
                }
                : section
        ));
    };

    // Delete a field
    const deleteField = (sectionId: string, fieldId: string) => {
        setSections(prev => prev.map(section => 
            section.id === sectionId 
                ? { ...section, fields: section.fields.filter(f => f.id !== fieldId) }
                : section
        ));
        setEditingField(null);
    };

    // Duplicate a field
    const duplicateField = (sectionId: string, fieldId: string) => {
        const section = sections.find(s => s.id === sectionId);
        const field = section?.fields.find(f => f.id === fieldId);
        if (field) {
            const newField = { ...field, id: generateId(), label: `${field.label} (Copy)` };
            setSections(prev => prev.map(s => 
                s.id === sectionId 
                    ? { ...s, fields: [...s.fields, newField] }
                    : s
            ));
        }
    };

    // Add a new section
    const addSection = () => {
        const newSection: Section = {
            id: `section-${Date.now()}`,
            title: `Section ${sections.length + 1}`,
            fields: [],
        };
        setSections(prev => [...prev, newSection]);
    };

    // Update section title
    const updateSectionTitle = (sectionId: string, title: string) => {
        setSections(prev => prev.map(section => 
            section.id === sectionId ? { ...section, title } : section
        ));
    };

    // Delete a section
    const deleteSection = (sectionId: string) => {
        if (sections.length > 1) {
            setSections(prev => prev.filter(s => s.id !== sectionId));
        }
    };

    // Add option to select/multiselect
    const addOption = (sectionId: string, fieldId: string) => {
        const section = sections.find(s => s.id === sectionId);
        const field = section?.fields.find(f => f.id === fieldId);
        if (field?.options) {
            updateField(sectionId, fieldId, { 
                options: [...field.options, `Option ${field.options.length + 1}`] 
            });
        }
    };

    // Update option
    const updateOption = (sectionId: string, fieldId: string, index: number, value: string) => {
        const section = sections.find(s => s.id === sectionId);
        const field = section?.fields.find(f => f.id === fieldId);
        if (field?.options) {
            const newOptions = [...field.options];
            newOptions[index] = value;
            updateField(sectionId, fieldId, { options: newOptions });
        }
    };

    // Delete option
    const deleteOption = (sectionId: string, fieldId: string, index: number) => {
        const section = sections.find(s => s.id === sectionId);
        const field = section?.fields.find(f => f.id === fieldId);
        if (field?.options && field.options.length > 1) {
            updateField(sectionId, fieldId, { 
                options: field.options.filter((_, i) => i !== index) 
            });
        }
    };

    // Handle generate
    const handleGenerate = () => {
        router.push("/dashboard/new/custom/generating");
    };

    // Get total field count
    const totalFields = sections.reduce((acc, section) => acc + section.fields.length, 0);

    // Render field preview based on type
    const renderFieldPreview = (field: CustomField) => {
        const fieldTypeData = fieldTypes.find(f => f.id === field.type);
        const IconComponent = fieldTypeData?.icon || TextalignLeft;

        switch (field.type) {
            case "text":
            case "email":
            case "phone":
            case "link":
            case "number":
            case "price":
                return (
                    <Field
                        label={field.label}
                        placeholder={field.placeholder}
                        value={previewAnswers[field.id] as string || ""}
                        onChange={(e) => setPreviewAnswers(prev => ({ ...prev, [field.id]: e.target.value }))}
                        type={field.type === "number" || field.type === "price" ? "number" : field.type === "email" ? "email" : "text"}
                        required={field.required}
                    />
                );
            case "textarea":
                return (
                    <Field
                        label={field.label}
                        placeholder={field.placeholder}
                        value={previewAnswers[field.id] as string || ""}
                        onChange={(e) => setPreviewAnswers(prev => ({ ...prev, [field.id]: e.target.value }))}
                        isTextarea
                        required={field.required}
                    />
                );
            case "date":
                return (
                    <div>
                        <label className="block text-small font-medium mb-2">
                            {field.label}
                            {field.required && <span className="text-primary3 ml-1">*</span>}
                        </label>
                        <DatePicker
                            selected={previewAnswers[field.id] ? new Date(previewAnswers[field.id] as string) : null}
                            onChange={(date) => setPreviewAnswers(prev => ({ ...prev, [field.id]: date?.toISOString() || "" }))}
                            placeholder="Select date"
                        />
                    </div>
                );
            case "daterange":
                return (
                    <div>
                        <label className="block text-small font-medium mb-2">
                            {field.label}
                            {field.required && <span className="text-primary3 ml-1">*</span>}
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <DatePicker
                                selected={null}
                                onChange={() => {}}
                                placeholder="Start date"
                            />
                            <DatePicker
                                selected={null}
                                onChange={() => {}}
                                placeholder="End date"
                            />
                        </div>
                    </div>
                );
            case "select":
                return (
                    <div>
                        <label className="block text-small font-medium mb-2">
                            {field.label}
                            {field.required && <span className="text-primary3 ml-1">*</span>}
                        </label>
                        <select 
                            className="w-full p-3 bg-b-surface2 rounded-xl border border-stroke-subtle focus:border-primary1 focus:outline-none"
                            value={previewAnswers[field.id] as string || ""}
                            onChange={(e) => setPreviewAnswers(prev => ({ ...prev, [field.id]: e.target.value }))}
                        >
                            <option value="">Select an option...</option>
                            {field.options?.map((option, i) => (
                                <option key={i} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                );
            case "multiselect":
                const selectedOptions = (previewAnswers[field.id] as string[]) || [];
                return (
                    <div>
                        <label className="block text-small font-medium mb-2">
                            {field.label}
                            {field.required && <span className="text-primary3 ml-1">*</span>}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {field.options?.map((option, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        const newSelected = selectedOptions.includes(option)
                                            ? selectedOptions.filter(o => o !== option)
                                            : [...selectedOptions, option];
                                        setPreviewAnswers(prev => ({ ...prev, [field.id]: newSelected }));
                                    }}
                                    className={`px-4 py-2 rounded-xl text-small transition-all ${
                                        selectedOptions.includes(option)
                                            ? "bg-primary1 text-white"
                                            : "bg-b-surface2 text-t-secondary hover:bg-b-highlight"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case "file":
            case "image":
                return (
                    <div>
                        <label className="block text-small font-medium mb-2">
                            {field.label}
                            {field.required && <span className="text-primary3 ml-1">*</span>}
                        </label>
                        <div className="border-2 border-dashed border-stroke-subtle rounded-xl p-8 text-center hover:border-primary1 transition-colors cursor-pointer">
                            <IconComponent size={32} color="#8E8E93" className="mx-auto mb-2" />
                            <p className="text-small text-t-secondary">
                                {field.type === "image" ? "Click to upload images" : "Click to upload files"}
                            </p>
                            <p className="text-xs text-t-tertiary mt-1">
                                {field.type === "image" ? "PNG, JPG, GIF up to 10MB" : "PDF, DOC, XLS up to 25MB"}
                            </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.push("/dashboard/new")}
                    className="flex items-center gap-2 text-small text-t-secondary hover:text-t-primary mb-4"
                >
                    <ArrowLeft2 size={16} color="#8E8E93" />
                    Back to industries
                </button>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary1/10 rounded-xl">
                            <Setting4 size={20} variant="Bold" color="#2d68ff" />
                        </div>
                        <div>
                            <h1 className="text-h3">Custom Brief Builder</h1>
                            <p className="text-small text-t-tertiary">
                                {totalFields} field{totalFields !== 1 ? "s" : ""} • {sections.length} section{sections.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsPreviewMode(!isPreviewMode)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                                isPreviewMode 
                                    ? "bg-primary1 text-white" 
                                    : "bg-b-surface2 text-t-secondary hover:text-t-primary"
                            }`}
                        >
                            <Eye size={18} color={isPreviewMode ? "#ffffff" : "#8E8E93"} />
                            <span className="text-small font-medium">
                                {isPreviewMode ? "Edit Mode" : "Preview"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Brief Name */}
            <div className="mb-6">
                <Field
                    label="Brief Name"
                    placeholder="e.g. Website Redesign Brief, Product Launch Plan"
                    value={briefName}
                    onChange={(e) => setBriefName(e.target.value)}
                />
            </div>

            {/* Sections */}
            <div className="space-y-6">
                {sections.map((section, sectionIndex) => (
                    <div 
                        key={section.id} 
                        className="bg-b-surface2 rounded-3xl p-6"
                    >
                        {/* Section Header */}
                        <div className="flex items-center justify-between mb-6">
                            {editingSectionTitle === section.id ? (
                                <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                                    onBlur={() => setEditingSectionTitle(null)}
                                    onKeyDown={(e) => e.key === "Enter" && setEditingSectionTitle(null)}
                                    className="text-body-bold bg-transparent border-b-2 border-primary1 focus:outline-none"
                                    autoFocus
                                />
                            ) : (
                                <button
                                    onClick={() => setEditingSectionTitle(section.id)}
                                    className="flex items-center gap-2 text-body-bold hover:text-primary1 transition-colors"
                                >
                                    {section.title}
                                    <Edit2 size={14} color="#8E8E93" />
                                </button>
                            )}
                            {sections.length > 1 && (
                                <button
                                    onClick={() => deleteSection(section.id)}
                                    className="p-2 text-t-tertiary hover:text-primary3 transition-colors"
                                >
                                    <Trash size={18} color="currentColor" />
                                </button>
                            )}
                        </div>

                        {/* Fields */}
                        {isPreviewMode ? (
                            <div className="space-y-6">
                                {section.fields.map((field) => (
                                    <div key={field.id}>
                                        {renderFieldPreview(field)}
                                    </div>
                                ))}
                                {section.fields.length === 0 && (
                                    <p className="text-center text-t-tertiary py-8">
                                        No fields in this section
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {section.fields.map((field) => {
                                    const fieldTypeData = fieldTypes.find(f => f.id === field.type);
                                    const IconComponent = fieldTypeData?.icon || TextalignLeft;
                                    const isEditing = editingField?.sectionId === section.id && editingField?.fieldId === field.id;

                                    return (
                                        <div 
                                            key={field.id}
                                            className={`p-4 rounded-2xl border-2 transition-all ${
                                                isEditing 
                                                    ? "border-primary1 bg-b-surface1" 
                                                    : "border-stroke-subtle bg-b-surface1 hover:border-primary1/50"
                                            }`}
                                        >
                                            {/* Field Header */}
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div 
                                                        className="flex items-center justify-center w-8 h-8 rounded-lg"
                                                        style={{ backgroundColor: `${fieldTypeData?.color}15` }}
                                                    >
                                                        <IconComponent size={16} color={fieldTypeData?.color} />
                                                    </div>
                                                    <span className="text-small text-t-tertiary">
                                                        {fieldTypeData?.name}
                                                    </span>
                                                    {field.required && (
                                                        <span className="text-xs text-primary3 font-medium">Required</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => setEditingField(isEditing ? null : { sectionId: section.id, fieldId: field.id })}
                                                        className="p-2 text-t-tertiary hover:text-primary1 transition-colors"
                                                    >
                                                        <Edit2 size={16} color="currentColor" />
                                                    </button>
                                                    <button
                                                        onClick={() => duplicateField(section.id, field.id)}
                                                        className="p-2 text-t-tertiary hover:text-primary1 transition-colors"
                                                    >
                                                        <Copy size={16} color="currentColor" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteField(section.id, field.id)}
                                                        className="p-2 text-t-tertiary hover:text-primary3 transition-colors"
                                                    >
                                                        <Trash size={16} color="currentColor" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Field Label Display */}
                                            <p className="text-body-bold mb-2">{field.label}</p>

                                            {/* Editing Panel */}
                                            {isEditing && (
                                                <div className="mt-4 pt-4 border-t border-stroke-subtle space-y-4">
                                                    <Field
                                                        label="Field Label"
                                                        placeholder="Enter field label"
                                                        value={field.label}
                                                        onChange={(e) => updateField(section.id, field.id, { label: e.target.value })}
                                                    />
                                                    <Field
                                                        label="Placeholder Text"
                                                        placeholder="Enter placeholder"
                                                        value={field.placeholder}
                                                        onChange={(e) => updateField(section.id, field.id, { placeholder: e.target.value })}
                                                    />
                                                    <label className="flex items-center gap-3 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={field.required}
                                                            onChange={(e) => updateField(section.id, field.id, { required: e.target.checked })}
                                                            className="w-5 h-5 rounded border-stroke-subtle text-primary1 focus:ring-primary1"
                                                        />
                                                        <span className="text-small">Required field</span>
                                                    </label>

                                                    {/* Options for select/multiselect */}
                                                    {(field.type === "select" || field.type === "multiselect") && (
                                                        <div>
                                                            <label className="block text-small font-medium mb-2">Options</label>
                                                            <div className="space-y-2">
                                                                {field.options?.map((option, index) => (
                                                                    <div key={index} className="flex items-center gap-2">
                                                                        <input
                                                                            type="text"
                                                                            value={option}
                                                                            onChange={(e) => updateOption(section.id, field.id, index, e.target.value)}
                                                                            className="flex-1 p-2 bg-b-surface2 rounded-lg border border-stroke-subtle focus:border-primary1 focus:outline-none text-small"
                                                                        />
                                                                        {field.options && field.options.length > 1 && (
                                                                            <button
                                                                                onClick={() => deleteOption(section.id, field.id, index)}
                                                                                className="p-2 text-t-tertiary hover:text-primary3"
                                                                            >
                                                                                <CloseCircle size={16} color="currentColor" />
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <button
                                                                onClick={() => addOption(section.id, field.id)}
                                                                className="mt-2 text-small text-primary1 hover:underline"
                                                            >
                                                                + Add option
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Add Field Button */}
                                {showFieldPicker === section.id ? (
                                    <div className="p-4 bg-b-surface1 rounded-2xl border-2 border-primary1">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-small font-medium">Choose field type</span>
                                            <button
                                                onClick={() => setShowFieldPicker(null)}
                                                className="p-1 text-t-tertiary hover:text-t-primary"
                                            >
                                                <CloseCircle size={18} color="currentColor" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2">
                                            {fieldTypes.map((type) => {
                                                const TypeIcon = type.icon;
                                                return (
                                                    <button
                                                        key={type.id}
                                                        onClick={() => addField(section.id, type.id)}
                                                        className="flex items-center gap-2 p-3 rounded-xl border border-stroke-subtle bg-b-surface2 hover:border-primary1 hover:bg-b-surface2 transition-colors text-left"
                                                    >
                                                        <div 
                                                            className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                                                            style={{ backgroundColor: `${type.color}20` }}
                                                        >
                                                            <TypeIcon size={16} color={type.color} />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-small font-medium truncate">{type.name}</p>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowFieldPicker(section.id)}
                                        className="w-full p-4 border-2 border-dashed border-stroke-subtle rounded-2xl text-t-secondary hover:border-primary1 hover:text-primary1 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Add size={20} color="currentColor" />
                                        <span className="text-small font-medium">Add Field</span>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add Section Button */}
            {!isPreviewMode && (
                <button
                    onClick={addSection}
                    className="w-full mt-6 p-4 bg-b-surface2 rounded-2xl text-t-secondary hover:text-primary1 transition-colors flex items-center justify-center gap-2"
                >
                    <Add size={20} color="currentColor" />
                    <span className="text-small font-medium">Add Section</span>
                </button>
            )}

            {/* Generate Button */}
            <div className="mt-8 flex justify-end">
                <Button
                    onClick={handleGenerate}
                    disabled={totalFields === 0 || !briefName}
                >
                    Generate Brief
                </Button>
            </div>
        </div>
    );
}
