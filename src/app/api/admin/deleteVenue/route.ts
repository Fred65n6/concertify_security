import { NextRequest, NextResponse } from 'next/server';
import Venue from '@/models/venueModel';


export async function DELETE(request: NextRequest) {
    try {
      const data = await request.json();
      const venueId = data.venueId;
  
      if (!venueId) {
        return NextResponse.json(
          { success: false, error: 'Missing required parameters' },
          { status: 400 }
        );
      }
  
      const deletionResult = await Venue.deleteOne({ _id: venueId });
  
      if (deletionResult.deletedCount === 0) {
        return NextResponse.json(
          { success: false, error: ' Venue not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        success: true,
        message: 'Venue deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting venue:', error);
      return NextResponse.json(
        { success: false, error: 'Error deleting venue' },
        { status: 500 }
      );
    }
  }
  
