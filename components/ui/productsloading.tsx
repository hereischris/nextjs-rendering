import React from 'react';

export function ProductsLoading(props: any) {
    const skeleton = [];
    for(let i=0; i<6; i++) {
        skeleton.push(  
                <div className="card" key={i}>
                    <div className="card-header animate-pulse">
                        <div className="w-full h-64 bg-gray-800 rounded-md block" />

                        <h2 className="text-lg font-semibold"><div className="h-6 mt-4 bg-gray-800 rounded-md" /></h2>
                    </div>
                    <div className="card-content animate-pulse">
                        <div className="h-4 w-full bg-gray-900 rounded mt-2" />
                        <div className="h-4 w-full bg-gray-900 rounded mt-2" />
                        <div className="h-4 w-full bg-gray-900 rounded mt-2" />
                    </div>
                </div>
    )}

    return (
      <div className="gap-4 p-6">
        <div className="grid grid-cols-3 gap-6">
          {skeleton}
        </div>
      </div>
    );
};

export default ProductsLoading;
