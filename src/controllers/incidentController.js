import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createIncident = async (req, res) => {
  try {
    const { type, description, location, mediaUrl } = req.body;
    const userId = req.user; // From authMiddleware

    const incident = await prisma.incident.create({
      data: {
        type,
        description,
        location,
        mediaUrl,
        userId,
      },
    });

    res.status(201).json(incident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserIncidents = async (req, res) => {
  try {
    const userId = req.user;
    const incidents = await prisma.incident.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllIncidents = async (req, res) => {
  try {
    const incidents = await prisma.incident.findMany({
      include: { user: { select: { email: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateIncidentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const incident = await prisma.incident.update({
      where: { id },
      data: { status },
    });

    res.json(incident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteIncident = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.incident.delete({ where: { id } });
    res.json({ message: "Incident deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
