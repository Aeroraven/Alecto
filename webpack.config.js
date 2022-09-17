const path=require('path');

module.exports={
    entry:'./src/index.ts',
    output:{
        path:path.resolve(__dirname,'./dist/'),
        filename:'bundle.js'
    },
    resolve:{
        extensions:['.ts','.js']
    },
    
    module: {
        rules: [
            {
                test: /\.tsx?$/,    
                use: "ts-loader",   
                exclude: "/node-modules/", 
                resolve:{
                    extensions:['.ts','.js']
                }
                
            }
        ]
    },
    plugins: [
        
    ],
    mode: 'development',
    devServer:{
        compress: true,
        port:1551,
        hot:true,
    },
    cache:false,
    
}