import React, { useState, useEffect, useCallback } from "react";

export const getRandomUserId = useCallback(() => {
  let userId = localStorage.getItem("userIdCodekage");
  if (!userId) {
    userId = Math.random().toString(36).substring(7);
    localStorage.setItem("userIdCodekage", userId);
  }
  return userId;
}, []);
