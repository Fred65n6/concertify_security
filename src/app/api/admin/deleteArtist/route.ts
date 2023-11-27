import { NextRequest, NextResponse } from 'next/server';
import Artist from '@/models/artistModel';


export async function DELETE(request: NextRequest) {
    try {
      const data = await request.json();
      const artistId = data.artistId;
  
      if (!artistId) {
        return NextResponse.json(
          { success: false, error: 'Missing required parameters' },
          { status: 400 }
        );
      }
  
      const deletionResult = await Artist.deleteOne({ _id: artistId });
  
      if (deletionResult.deletedCount === 0) {
        return NextResponse.json(
          { success: false, error: ' Artist not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        success: true,
        message: 'Artist was deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting artist:', error);
      return NextResponse.json(
        { success: false, error: 'Error deleting artist' },
        { status: 500 }
      );
    }
  }
  
