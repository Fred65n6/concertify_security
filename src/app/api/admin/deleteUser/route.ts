import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';


export async function DELETE(request: NextRequest) {
    try {
      const data = await request.json();
      const userId = data.userId;
  
      if (!userId) {
        return NextResponse.json(
          { success: false, error: 'Missing required parameters' },
          { status: 400 }
        );
      }
  
      const deletionResult = await User.deleteOne({ _id: userId });
  
      if (deletionResult.deletedCount === 0) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json(
        { success: false, error: 'Error deleting user' },
        { status: 500 }
      );
    }
  }
  
