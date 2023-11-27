import { NextRequest, NextResponse } from 'next/server';
import Concert from '@/models/concertModel';


export async function DELETE(request: NextRequest) {
    try {
      const data = await request.json();
      const concertId = data.concertId;
  
      if (!concertId) {
        return NextResponse.json(
          { success: false, error: 'Missing required parameters' },
          { status: 400 }
        );
      }
  
      const deletionResult = await Concert.deleteOne({ _id: concertId });
  
      if (deletionResult.deletedCount === 0) {
        return NextResponse.json(
          { success: false, error: ' Concert not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        success: true,
        message: 'Concert deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting concert:', error);
      return NextResponse.json(
        { success: false, error: 'Error deleting concert' },
        { status: 500 }
      );
    }
  }
  
