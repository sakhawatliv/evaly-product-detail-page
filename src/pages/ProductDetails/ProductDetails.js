import React,{ useState, useEffect } from 'react'
import axios from "axios";

// library
import {
    Magnifier,
    GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION
  } from "react-image-magnifiers";

// custom components
import GridContainer from "../../components/Grid/GridContainer"
import GridItem from "../../components/Grid/GridItem"
import Select from "../../components/Select/Select"
import Button from "../../components/Button/Button"
import Paper from "../../components/Paper/Paper"
import Card from '../../components/Card/Card';
import CardImage from '../../components/Card/CardImage';
import CardBody from "../../components/Card/CardBody"

//styles
import "./styles/productDetailsStyle.css"

function ProductDetails(){
    const [data,setData] = useState(null)
    const [color,setColor] = useState("")
    const [size,setSize] = useState("")
    const [colors,setColors] = useState([])
    const [sizes,setSizes] = useState([])
    const [shops,setShops] = useState([])
    const [mainImage,setMainImage] = useState("")
    const [images,setImages] = useState([])
    const [variant,setVariant] = useState(null)
    const productSlug = "bangladesh-cricket-jersey-from-evaly-6bad62271"

    useEffect(() =>{
        async function fetchData(){
            const result = await axios (`https://api-dev.evaly.com.bd/go-catalog/api/v1/public/products/${productSlug}`)
            if(result){
                debugger
                setMainImage(result.data.data.product_variants[0].product_images[0])
                let colorsAtr = result.data.data.attributes.find(a =>a.attribute_name === "color").attribute_data.values
                let sizesAtr = result.data.data.attributes.find(a =>a.attribute_name === "size").attribute_data.values
                let variantColor = null
                let variantSize = null
                for(let c = 0;c < colorsAtr.length;c++){
                    if(result.data.data.product_variants[0].attribute_values.includes(colorsAtr[c].key)){
                        variantColor = colorsAtr[c].key
                    }
                }
                for(let s = 0;s < sizesAtr.length;s++){
                    if(result.data.data.product_variants[0].attribute_values.includes(sizesAtr[s].key)){
                        variantSize = sizesAtr[s].key
                    }
                }

                setData(result.data.data)
                setColors(colorsAtr)
                setSizes(sizesAtr)
                setColor(variantColor)
                setSize(variantSize)
                setVariant(result.data.data.product_variants[0])
                setImages(result.data.data.product_variants[0].product_images)
                console.log(result.data.data.product_variants[0])
               // changeVariant(colorsAtr[0].key,sizesAtr[0].key)

                getShops(result.data.data.product_variants[0].variant_id)
            }
            
        }
        fetchData()
    },[])
    

    function changeVariant(colorKey,sizeKey){
        let variants = []
        if(data){
            variants = data.product_variants
        }
        let selectedVariant = variants.filter(a => a.attribute_values.includes(parseInt(colorKey))).filter(a => a.attribute_values.includes(parseInt(sizeKey)))
        console.log(selectedVariant[0])
        setVariant(selectedVariant[0])
        getShops(selectedVariant && selectedVariant[0].variant_id)
    }

    function changeColor(event){
        setColor(event.target.value)
        changeVariant(event.target.value,size)
    }
    function changeSize(event){
        setSize(event.target.value)
        changeVariant(color,event.target.value)
    }
    function changeImage(event){
        debugger
        let imgIndex = event.currentTarget.id.split("-")[1]
        let imgUrl = images[parseInt(imgIndex)]  
        setMainImage(imgUrl)

    }
    async function getShops(variantId){
        const shopList = await axios (`https://api-dev.evaly.com.bd/go-catalog/api/v1/public/shop-items/shops/${variantId}`)
        if(shopList){
            setShops(shopList.data.data)
            console.log(shopList.data.data)   
        }
            
    }




    //if(variant){debugger}
    return(
        <div>
            <div className="product-detail-wrapper">
                {data === null ?
                    <div>Loading....</div>
                    :
                    <div>
                        <div className="product-info">
                            <Paper color="off-white" ps="1" border="br-all-10">
                                <GridContainer>
                                    <GridItem md={9} xs={10}>
                                        {/* <div className="product-image-area-card"> */}
                                            <Paper border="br-left">
                                                <div className="product-image-info-area">
                                                    <GridContainer>
                                                        <GridItem md={6} xs={12}>
                                                            <div className="product-main-image">
                                                                <SideBySideMagnifier
                                                                imageSrc={mainImage}
                                                                imageAlt="Example"
                                                                fillAvailableSpace={false}
                                                                />
                                                            </div>
                                                            <div className="product-images-area">
                                                                {images.map((src,index) => (
                                                                    <div id={`imgdiv-${index}`} onClick={changeImage}>
                                                                        <img width="100px" src={src} alt={`image-${index}`}/>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </GridItem>
                                                        <GridItem md={6} xs={12}>
                                                            <div className="product-variant-wrapper">
                                                                <div className="title-area">
                                                                    <h2>{variant && variant.product_name}</h2>
                                                                    {/* <h2>Bangladesh cricket jersey from "evaly"</h2> */}
                                                                </div>
                                                                <div className="brand-area">
                                                                    <p className="sku">SKU: <span>{variant && variant.sku}</span></p>
                                                                    <p>BRAND: <span>{variant && variant.brand_name}</span> | {`More ${variant && variant.category_name} `}<span>{variant && variant.brand_name}</span></p>
                                                                </div>

                                                                <div className="product-price-area">
                                                                    <h2>৳ {variant && variant.min_price}</h2>
                                                                    <span>Starting price</span>
                                                                </div>

                                                                
                                                                    
                                                                
                                                                <GridContainer>
                                                                    <GridItem md={3}>
                                                                        <Select 
                                                                            label="quantity"
                                                                            options={[{key:1,value:"only 1"},{key:2,value:"only 2"},{key:3,value:"only 3"},{key:4,value:"only 4"},{key:5,value:"only 5"}]}
                                                                            // value={"saab"}
                                                                            onChange={changeColor}
                                                                        ></Select>
                                                                    </GridItem>
                                                                    <GridItem md={3}>
                                                                        <Select 
                                                                            label="color"
                                                                            options={colors}
                                                                            value={color}
                                                                            onChange={changeColor}
                                                                        ></Select>
                                                                    </GridItem>
                                                                    <GridItem md={3}>
                                                                        <Select 
                                                                            label="size"
                                                                            options={sizes}
                                                                            value={size}
                                                                            onChange={changeSize}
                                                                        ></Select>
                                                                    </GridItem>
                                                                </GridContainer>

                                                                <div className="check-shop-button">
                                                                    <Button
                                                                        btnText="Check available Shop"
                                                                    ></Button>
                                                                </div>
                                                            </div>
                                                        </GridItem>
                                                    </GridContainer>
                                                </div>
                                            </Paper>
                                        {/* </div> */}
                                    </GridItem>
                                    <GridItem md={3}>
                                        <h1>Sakhawat</h1>
                                    </GridItem>
                                </GridContainer>
                            </Paper>
                        </div>   
                        <div className="product-description-area">
                            <Paper color="off-white" ps="1">
                                <div className="description-title-area">
                                    <h2>{`Product details of ${variant && variant.product_name}`}</h2>
                                </div>
                                <div className="description-body">
                                    <p>{variant && variant.product_description}</p>
                                </div>
                            </Paper>
                        </div> 

                        <div className="shop-area-wrapper">
                            <div className="shop-title-area">
                                <h2>Available Shops</h2>
                            </div>
                            <GridContainer>
                                {shops.map((shop,index) => (
                                    <GridItem>
                                        <div className="shop-item mr-25">
                                            <Card>
                                                <CardImage src={shop.shop_image}/>
                                                <CardBody>
                                                    <h2>{shop.shop_name}</h2>
                                                    <div className="shop-remark">
                                                        <p>******</p>
                                                        <p className="sr-price"><span>{`৳${shop.price}  `}</span>{`৳${shop.discounted_price}`}</p>
                                                    </div>
                                                    <div className="shop-button-area">
                                                        <button className="shop-button bg-black">Chat</button>
                                                        <button className="shop-button bg-red">Buy Now</button>
                                                    </div>
                                                </CardBody>                              
                                            </Card>
                                        </div>
                                     </GridItem>
                                ))}
                                
                            </GridContainer>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default ProductDetails