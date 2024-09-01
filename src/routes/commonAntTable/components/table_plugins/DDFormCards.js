import React from 'react';

const DDFormCards = ({ formData }) => {
    const renderField = (field) => {
        switch (field.componentType) {
            case 'TextField':
            case 'DDSelectField':
            case 'DDMultiSelectField':
            case 'DDDateField':
                return (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ flex: 'none', width: '200px' }}>{field.name}:</div>
                        <div style={{ flex: 'none', width: '1000px', marginLeft: '10px' }}>{field.value || ''}</div>
                    </div>
                );

            case 'DDPhotoField':
                return (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">{field.name}</label>
                        {field.value &&
                            JSON.parse(field.value).map((url, index) => (
                                <div key={index} className="mt-2">
                                    <img src={url} alt={`Image ${index + 1}`} className="max-w-full h-auto rounded-lg shadow-md" />
                                    <p className="mt-1 text-sm text-gray-500">{url}</p>
                                </div>
                            ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold">流程数据</h2>
            <div>
                {formData.map((field, index) => (
                    <div key={index}>{renderField(field)}</div>
                ))}
            </div>
        </div>
    );
};

export default DDFormCards;
