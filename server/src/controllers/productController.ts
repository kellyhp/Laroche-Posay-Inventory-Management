import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, name, price, rating, stockQuantity } = req.body;
    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export const deleteProduct = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { productId } = req.params;
      const product = await prisma.products.delete({
        where: { productId: productId },
      });
      res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
      res.status(500).json({ message: "Error deleting product" });
    }
};

export const updateProduct = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { productId } = req.params;
      const { name, price, rating, stockQuantity } = req.body;
  
      const product = await prisma.products.update({
        where: { productId: productId },
        data: {
          name,
          price,
          rating,
          stockQuantity,
        },
      });
      res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
      res.status(500).json({ message: "Error updating product" });
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    
    const product = await prisma.products.findUnique({
      where: {
        productId: productId,
      },
    });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error retrieving product by ID:', error);
    res.status(500).json({ message: 'Error retrieving product' });
  }
};