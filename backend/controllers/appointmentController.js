const asyncHandler = require('express-async-handler');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const sendEmail = require('../utils/sendEmail');

const bookAppointment = asyncHandler(async (req, res) => {
  const { doctorId, hospitalId, date, time, type, symptoms, notes } = req.body;

  if (!doctorId || !date || !time) {
    res.status(400);
    throw new Error('Please provide doctor, date and time');
  }

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    res.status(404);
    throw new Error('Doctor not found');
  }

  const appointment = await Appointment.create({
    user: req.user._id,
    doctor: doctorId,
    hospital: hospitalId || doctor.hospital,
    date,
    time,
    type: type || 'In-Person',
    symptoms,
    notes,
    status: 'Pending',
    paymentStatus: 'Pending',
    amount: doctor.consultationFee
  });

  const slotIndex = doctor.availableSlots.findIndex(
    slot => new Date(slot.date).toISOString().split('T')[0] === date && slot.time === time
  );
  if (slotIndex !== -1) {
    doctor.availableSlots[slotIndex].isBooked = true;
    await doctor.save();
  }

  const user = req.user;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4f8; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #00B4D8, #0077B6); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .body { padding: 30px; }
        .info { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .info p { margin: 8px 0; color: #333; }
        .label { font-weight: bold; color: #0077B6; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏥 MediCare AI</h1>
        </div>
        <div class="body">
          <h2>Appointment Confirmed! ✅</h2>
          <p>Hello ${user.name}, your appointment has been booked successfully.</p>
          <div class="info">
            <p><span class="label">Doctor:</span> Dr. ${doctor.name}</p>
            <p><span class="label">Specialization:</span> ${doctor.specialization}</p>
            <p><span class="label">Date:</span> ${new Date(date).toLocaleDateString('en-IN')}</p>
            <p><span class="label">Time:</span> ${time}</p>
            <p><span class="label">Type:</span> ${type || 'In-Person'}</p>
          </div>
          <p>Please arrive 15 minutes before your scheduled time.</p>
        </div>
        <div class="footer">
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await sendEmail(user.email, 'Appointment Confirmation - MediCare AI', emailHtml);
  } catch (emailError) {
    console.error('Email sending failed:', emailError);
  }

  res.status(201).json({
    success: true,
    appointment
  });
});

const getUserAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id })
    .populate('doctor', 'name specialization photo consultationFee')
    .populate('hospital', 'name address city phone')
    .sort({ date: -1, time: -1 });

  res.json({
    success: true,
    count: appointments.length,
    appointments
  });
});

const cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  if (appointment.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to cancel this appointment');
  }

  if (appointment.status === 'Cancelled') {
    res.status(400);
    throw new Error('Appointment already cancelled');
  }

  appointment.status = 'Cancelled';
  await appointment.save();

  const doctor = await Doctor.findById(appointment.doctor);
  if (doctor) {
    const slotIndex = doctor.availableSlots.findIndex(
      slot => new Date(slot.date).toISOString().split('T')[0] === new Date(appointment.date).toISOString().split('T')[0] && slot.time === appointment.time
    );
    if (slotIndex !== -1) {
      doctor.availableSlots[slotIndex].isBooked = false;
      await doctor.save();
    }
  }

  const user = req.user;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4f8; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
        .header { background: #EF233C; padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .body { padding: 30px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏥 MediCare AI</h1>
        </div>
        <div class="body">
          <h2>Appointment Cancelled ❌</h2>
          <p>Hello ${user.name}, your appointment has been cancelled as requested.</p>
          <p>If this was a mistake, please book a new appointment.</p>
        </div>
        <div class="footer">
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await sendEmail(user.email, 'Appointment Cancelled - MediCare AI', emailHtml);
  } catch (emailError) {
    console.error('Email sending failed:', emailError);
  }

  res.json({
    success: true,
    message: 'Appointment cancelled successfully',
    appointment
  });
});

const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const appointment = await Appointment.findById(req.params.id)
    .populate('user', 'name email')
    .populate('doctor', 'name')
    .populate('hospital', 'name');

  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  appointment.status = status;
  await appointment.save();

  res.json({
    success: true,
    appointment
  });
});

module.exports = {
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
  updateAppointmentStatus
};